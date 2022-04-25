import { ITokens } from '@src/generated/types';
import ITokenPayload from '@src/interfaces/ITokenPayload';
import jwt from 'jsonwebtoken';
import { EnvError } from './errors';

const decodeToken = (token: ITokens['accessToken'] | ITokens['refreshToken']): ITokenPayload => {
    if (!process.env.JWT_SECRET) {
        throw new EnvError('No JWT secret set. Set environment variable JWT_SECRET to decode token.');
    }
    return jwt.verify(token, process.env.JWT_SECRET as string, {
        issuer: process.env.REFRESH_TOKEN_ISSUER
    }) as ITokenPayload;
};

export default decodeToken;
