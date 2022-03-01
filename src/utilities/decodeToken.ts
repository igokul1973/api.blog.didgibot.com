import ITokenPayload from '@src/interfaces/ITokenPayload';
import jwt from 'jsonwebtoken';
import { EnvError } from './errors';

const decodeToken = (token: string): ITokenPayload => {
    const accessToken = token.replace('Bearer ', '');

    if (!process.env.JWT_SECRET) {
        throw new EnvError('No JWT secret set. Set environment variable JWT_SECRET to decode token.');
    }
    return jwt.verify(accessToken, process.env.JWT_SECRET as string, {
        issuer: process.env.REFRESH_TOKEN_ISSUER
    }) as ITokenPayload;
};

export default decodeToken;
