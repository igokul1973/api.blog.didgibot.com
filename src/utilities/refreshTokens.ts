import { ITokens } from '@src/generated/types';
import { gql } from 'apollo-server';
import { IUserExtended } from '../interfaces/IUser';
import ogm from '../neo4j/ogm';
import createToken from './createToken';
import { ForbiddenError, UnauthorizedError } from './errors';
import decodeToken from './decodeToken';

const refreshTokens = async (refreshToken: ITokens['refreshToken']) => {
    let email;
    try {
        // First - verifying the refresh token
        const tokenPayload = decodeToken(refreshToken);
        email = tokenPayload.email;
    } catch (error) {
        // In case the token is not valid
        throw new ForbiddenError('The refresh token is expired');
    }

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

    const newAccessToken = createToken(existingUser, 'access');
    const newRefreshToken = createToken(existingUser, 'refresh');

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export default refreshTokens;
