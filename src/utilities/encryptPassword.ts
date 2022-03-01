import auth from './passportLocalAuthenticate';

const encryptPassword = (password: string): Promise<{ hash: string; salt: string }> => {
    return new Promise((resolve, reject) => {
        auth.hash(
            password,
            {
                digestAlgorithm: 'sha256'
            },
            (err: Error, hashed: { hash: string; salt: string }) => {
                if (err) {
                    reject(err);
                }
                resolve(hashed);
            }
        );
    });
};

export default encryptPassword;
