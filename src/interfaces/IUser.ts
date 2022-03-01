import { IUser, Scalars } from '@src/generated/types';

export interface IUserPrivate {
    hash: Scalars['String'];
    salt: Scalars['String'];
}

export interface IUserExtended extends IUserPrivate, IUser {}
