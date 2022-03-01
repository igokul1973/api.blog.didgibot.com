import { IUserPrivate } from '@interfaces/IUser';
import crypto, { BinaryLike } from 'crypto';
import { ArgumentError } from './errors';
import scmp from './scmp';

type TVerifyNext = (error: Error | null, verified?: boolean) => void;
type THashNext = (error: Error | null, user?: Omit<IUserPrivate, 'id'>) => void;
type TPbkdf2Callback = (err: Error | null, derivedKey: Buffer) => unknown;

interface IPbkdf2Options {
    saltlen: number;
    encoding: BufferEncoding;
    iterations: number;
    keylen: number;
    digestAlgorithm: string;
}

const getOptions = (options?: Partial<IPbkdf2Options>): IPbkdf2Options => {
    const defaultOptions: IPbkdf2Options = {
        saltlen: 32,
        encoding: 'hex',
        iterations: 25000,
        keylen: 512,
        digestAlgorithm: 'sha256'
    };

    if (options) {
        return {
            ...defaultOptions,
            ...options
        };
    }

    return defaultOptions;
};

const hash = (password: string, options: Partial<IPbkdf2Options>, next: THashNext): void => {
    let finalOptions: IPbkdf2Options;
    if (typeof options === 'function') {
        next = options;
        finalOptions = getOptions();
    } else {
        finalOptions = getOptions(options);
    }

    if (!password) {
        return next(new ArgumentError('Password argument is not specified'));
    }

    crypto.randomBytes(finalOptions.saltlen, (err: Error | null, buf: Buffer): void => {
        if (err) {
            return next(err);
        }

        const salt = buf.toString(finalOptions.encoding);

        pbkdf2(
            password,
            salt,
            finalOptions.iterations,
            finalOptions.keylen,
            finalOptions.digestAlgorithm,
            (err, hashRaw) => {
                if (err) {
                    return next(err);
                }

                const hash = Buffer.from(hashRaw.toString(finalOptions.encoding), 'binary').toString(
                    finalOptions.encoding
                );

                next(null, { salt, hash });
            }
        );
    });
};

const verify = (
    password: BinaryLike,
    existingCredentials: IUserPrivate,
    options: Partial<IPbkdf2Options>,
    next: TVerifyNext
): void => {
    let finalOptions: IPbkdf2Options;
    if (typeof options === 'function') {
        next = options;
        finalOptions = getOptions();
    } else {
        finalOptions = getOptions(options);
    }

    if (typeof next === 'function') {
        if (!password) {
            return next(new ArgumentError('Password argument is not specified'));
        }
        if (!existingCredentials) {
            return next(new ArgumentError('Credentials argument is not specified'));
        }
        if (!existingCredentials.salt) {
            return next(new ArgumentError('Salt argument is not specified'));
        }
        if (!existingCredentials.hash) {
            return next(new ArgumentError('Hash argument is not specified'));
        }
        if (typeof options === 'object') {
            pbkdf2(
                password,
                existingCredentials.salt,
                finalOptions.iterations,
                finalOptions.keylen,
                finalOptions.digestAlgorithm,
                function (err, hashRaw) {
                    if (err) {
                        return next(err);
                    }

                    const hashBuffer = Buffer.from(hashRaw.toString(finalOptions.encoding));
                    const existingCredentialsHashBuffer = Buffer.from(existingCredentials.hash, finalOptions.encoding);

                    return next(null, scmp(hashBuffer, existingCredentialsHashBuffer));
                }
            );
        }
    }
};

const pbkdf2 = (
    password: BinaryLike,
    salt: BinaryLike,
    iterations: number,
    keylen: number,
    digestAlgorithm: string,
    callback: TPbkdf2Callback
): void => {
    crypto.pbkdf2(password, salt, iterations, keylen, digestAlgorithm, callback);
};

export default {
    hash,
    verify
};
