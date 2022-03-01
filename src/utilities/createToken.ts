import jwt from 'jsonwebtoken';
import { IUser } from '@src/generated/types';
import ITokenPayload from '@interfaces/ITokenPayload';
import { EnvError } from './errors';

type Options = {
    expiresIn: number;
    algorithm: 'HS256' | 'HS384' | 'RS256';
    issuer?: string;
};

const getPayload = function (user: IUser): ITokenPayload {
    return {
        id: user.id,
        email: user.email
    };
};

export default function createToken(user: IUser, type = 'access', tokenLife?: number): string {
    if (!process.env.JWT_SECRET) {
        throw new EnvError('No JWT secret');
    }
    const payload = getPayload(user);
    tokenLife =
        tokenLife || type === 'access'
            ? Number(process.env.ACCESS_TOKEN_LIFE) || 600
            : Number(process.env.REFRESH_TOKEN_LIFE) || 1200;
    const options: Options = {
        expiresIn: tokenLife,
        algorithm: 'HS256',
        issuer: process.env.REFRESH_TOKEN_ISSUER
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
