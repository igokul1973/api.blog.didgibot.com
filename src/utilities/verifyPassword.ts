import { IUserPrivate } from '@src/interfaces/IUser';
import auth from './passportLocalAuthenticate';

/*
 * Verifies user password
 * @param password
 * @param user
 */
const verifyPassword = (password: string, user: IUserPrivate): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        auth.verify(
            password,
            user,
            {
                digestAlgorithm: 'sha256'
            },
            (err: Error, verified: boolean) => {
                if (err) {
                    reject(err);
                }
                resolve(verified);
            }
        );
    });
};

export default verifyPassword;
