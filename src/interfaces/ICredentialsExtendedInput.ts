import { ICredentialsInput, Scalars } from '@src/generated/types';

export type ICredentialsExtendedInput = ICredentialsInput & {
    phone: Scalars['String'];
};
