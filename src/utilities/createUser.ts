import { ICredentialsExtendedInput } from '@src/generated/types';
import { IUserExtended } from '@interfaces/IUser';
import ogm from '../neo4j/ogm';
import encryptPassword from './encryptPassword';
import { UnauthorizedError } from './errors';

const createUser = async (input: ICredentialsExtendedInput) => {
    const { email, password, phone } = input;
    const User = ogm.model('User');
    const [existingEmail] = await User.find({
        where: { email }
    });
    // Making user the requested user does not exist
    if (existingEmail) {
        throw new UnauthorizedError(`User with email ${email} already exists!`);
    }
    // Making sure there are no phone duplicates
    const [existingPhone] = await User.find({
        where: { phone }
    });

    if (existingPhone) {
        throw new UnauthorizedError(`User with phone number ${phone} already exists!`);
    }
    // Encrypting password. We do not save passwords in the database.
    const { hash: createdHash, salt: createdSalt } = await encryptPassword(password);
    // Creating user
    await User.create<{ users: IUserExtended[] }>({
        input: [
            {
                email,
                hash: createdHash,
                salt: createdSalt,
                phone,
                ip: '192.168.0.12'
            }
        ]
    });
};

export default createUser;
