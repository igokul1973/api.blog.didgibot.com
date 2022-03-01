import { ICredentialsExtendedInput, IUser } from '@src/generated/types';
import ogm from '@src/neo4j/ogm';
import { gql } from 'apollo-server';
import encryptPassword from './encryptPassword';
import { UnauthorizedError } from './errors';

const registerAdmin = async (input: ICredentialsExtendedInput) => {
    const { email, password, phone } = input;
    const User = ogm.model('User');

    const [existingEmail] = await User.find({
        where: { email: email }
    });

    if (existingEmail) {
        throw new UnauthorizedError(`User with email ${email} already exists!`);
    }

    const [existingPhone] = await User.find({
        where: { phone }
    });

    if (existingPhone) {
        throw new UnauthorizedError(`User with phone number ${phone} already exists!`);
    }

    const { hash: createdHash, salt: createdSalt } = await encryptPassword(password);
    const selectionSet = gql(`
                        {
                            info {
                                nodesCreated
                            }
                            users {
                                id
                                email
                                phone
                                ip
                                createdAt
                                updatedAt
                                lastLoggedAt
                            }
                        }
                    `);

    try {
        const [newUser] = (
            await User.create<{ users: IUser[] }>({
                input: [
                    {
                        email,
                        hash: createdHash,
                        salt: createdSalt,
                        phone,
                        ip: '192.168.0.12'
                    }
                ],
                selectionSet
            })
        ).users;

        return newUser;
    } catch (error) {
        return console.error('The error while registering new blog admin: ', error);
    }
};

export default registerAdmin;
