import { ICredentialsInput, ITokens } from '@src/generated/types';
import loginUser from '@utilities/loginUser';
import refreshTokens from './utilities/refreshTokens';

const resolvers = {
    Mutation: {
        async loginUser(_: unknown, { input }: { input: ICredentialsInput }): Promise<ITokens> {
            return loginUser(input);
        },
        async refreshTokens(_: unknown, { refreshToken }: { refreshToken: ITokens['refreshToken'] }): Promise<ITokens> {
            return refreshTokens(refreshToken);
        }
    }
};

export default resolvers;
