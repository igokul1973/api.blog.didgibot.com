import { ICredentialsInput, ITokens } from '@src/generated/types';
import loginUser from '@utilities/loginUser';

const resolvers = {
    Mutation: {
        async loginUser(_: unknown, { input }: { input: ICredentialsInput }): Promise<ITokens> {
            return loginUser(input);
        }
    }
};

export default resolvers;
