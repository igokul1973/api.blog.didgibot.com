import { ICredentialsInput, IUser } from '@src/generated/types';
import { gql } from 'apollo-server';
import { IUserExtended } from '../interfaces/IUser';
import ogm from '../neo4j/ogm';
import createToken from './createToken';
import { UnauthorizedError } from './errors';
import verifyPassword from './verifyPassword';

const loginUser = async (input: ICredentialsInput) => {
    const { email, password } = input;
    const User = ogm.model('User');
    const selectionSet = gql(`
                        {
                            id
                            email
                            phone
                            salt
                            hash
                            ip
                            createdAt
                            updatedAt
                            lastLoggedAt
                        }
                    `);

    const existingUsers = await User.find<IUserExtended[]>({
        where: {
            email
        },
        selectionSet
    });

    const existingUser = existingUsers[0];

    if (!existingUser) {
        throw new UnauthorizedError('Not authorized');
    }

    const passwordVerified = await verifyPassword(password, existingUser);

    if (!passwordVerified) {
        throw new UnauthorizedError('Not authorized');
    }

    const accessToken = createToken(existingUser, 'access');
    const refreshToken = createToken(existingUser, 'refresh');

    // Updating field lastLoggedAt since user here effectively logs in
    await User.update<IUser>({
        where: { id: existingUser.id },
        update: { lastLoggedAt: new Date().toISOString() }
    });

    return { accessToken, refreshToken };
};

export default loginUser;
