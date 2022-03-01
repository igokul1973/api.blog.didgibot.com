/* eslint-disable */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date and time, represented as an ISO-8601 string */
  DateTime: string;
};

export type IArticle = {
  __typename?: 'Article';
  /** Article author. */
  author: IUser;
  /** Article categories. */
  categories: Array<ICategory>;
  /** Article content. */
  content?: Maybe<Scalars['String']>;
  /** Article created date. */
  createdAt: Scalars['DateTime'];
  /** Article header. */
  header: Scalars['String'];
  id: Scalars['ID'];
  /** Publication status. */
  isPublished: Scalars['Boolean'];
  /** Article language. */
  language: ILanguagesEnum;
  /** Article published date. */
  publishedAt: Scalars['DateTime'];
  /** Article subheader. */
  subheader?: Maybe<Scalars['String']>;
  /** Article tags. */
  tags: Array<Maybe<ITag>>;
  /** Article updated date. */
  updatedAt: Scalars['DateTime'];
};

export type IArticleAggregateSelection = {
  __typename?: 'ArticleAggregateSelection';
  content: IStringAggregateSelectionNullable;
  count: Scalars['Int'];
  createdAt: IDateTimeAggregateSelectionNonNullable;
  header: IStringAggregateSelectionNonNullable;
  id: IIdAggregateSelectionNonNullable;
  publishedAt: IDateTimeAggregateSelectionNonNullable;
  subheader: IStringAggregateSelectionNullable;
  updatedAt: IDateTimeAggregateSelectionNonNullable;
};

export type IArticleCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  header: Scalars['String'];
  isPublished: Scalars['Boolean'];
  language: ILanguagesEnum;
  subheader?: InputMaybe<Scalars['String']>;
};

export type IArticleOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ArticleSort objects to sort Articles by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<IArticleSort>>;
};

/** Fields to sort Articles by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArticleSort object. */
export type IArticleSort = {
  content?: InputMaybe<ISortDirection>;
  createdAt?: InputMaybe<ISortDirection>;
  header?: InputMaybe<ISortDirection>;
  id?: InputMaybe<ISortDirection>;
  isPublished?: InputMaybe<ISortDirection>;
  language?: InputMaybe<ISortDirection>;
  publishedAt?: InputMaybe<ISortDirection>;
  subheader?: InputMaybe<ISortDirection>;
  updatedAt?: InputMaybe<ISortDirection>;
};

export type IArticleUpdateInput = {
  content?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<ILanguagesEnum>;
  subheader?: InputMaybe<Scalars['String']>;
};

export type IArticleWhere = {
  AND?: InputMaybe<Array<IArticleWhere>>;
  OR?: InputMaybe<Array<IArticleWhere>>;
  content?: InputMaybe<Scalars['String']>;
  content_CONTAINS?: InputMaybe<Scalars['String']>;
  content_ENDS_WITH?: InputMaybe<Scalars['String']>;
  content_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content_NOT?: InputMaybe<Scalars['String']>;
  content_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  content_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  content_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  content_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  content_STARTS_WITH?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_GT?: InputMaybe<Scalars['DateTime']>;
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_LT?: InputMaybe<Scalars['DateTime']>;
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  header?: InputMaybe<Scalars['String']>;
  header_CONTAINS?: InputMaybe<Scalars['String']>;
  header_ENDS_WITH?: InputMaybe<Scalars['String']>;
  header_IN?: InputMaybe<Array<Scalars['String']>>;
  header_NOT?: InputMaybe<Scalars['String']>;
  header_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  header_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  header_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  header_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  header_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  isPublished_NOT?: InputMaybe<Scalars['Boolean']>;
  language?: InputMaybe<ILanguagesEnum>;
  language_IN?: InputMaybe<Array<ILanguagesEnum>>;
  language_NOT?: InputMaybe<ILanguagesEnum>;
  language_NOT_IN?: InputMaybe<Array<ILanguagesEnum>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_GT?: InputMaybe<Scalars['DateTime']>;
  publishedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  publishedAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  publishedAt_LT?: InputMaybe<Scalars['DateTime']>;
  publishedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  publishedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  publishedAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  subheader?: InputMaybe<Scalars['String']>;
  subheader_CONTAINS?: InputMaybe<Scalars['String']>;
  subheader_ENDS_WITH?: InputMaybe<Scalars['String']>;
  subheader_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subheader_NOT?: InputMaybe<Scalars['String']>;
  subheader_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  subheader_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  subheader_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subheader_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  subheader_STARTS_WITH?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type ICategory = {
  __typename?: 'Category';
  /** Categorys with this tag name */
  articles: Array<Maybe<IArticle>>;
  /** Category created date. */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Category name. */
  name: Scalars['String'];
  /** Category updated date. */
  updatedAt: Scalars['DateTime'];
};

export type ICategoryAggregateSelection = {
  __typename?: 'CategoryAggregateSelection';
  count: Scalars['Int'];
  createdAt: IDateTimeAggregateSelectionNonNullable;
  id: IIdAggregateSelectionNonNullable;
  name: IStringAggregateSelectionNonNullable;
  updatedAt: IDateTimeAggregateSelectionNonNullable;
};

export type ICategoryCreateInput = {
  name: Scalars['String'];
};

export type ICategoryOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more CategorySort objects to sort Categories by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ICategorySort>>;
};

/** Fields to sort Categories by. The order in which sorts are applied is not guaranteed when specifying many fields in one CategorySort object. */
export type ICategorySort = {
  createdAt?: InputMaybe<ISortDirection>;
  id?: InputMaybe<ISortDirection>;
  name?: InputMaybe<ISortDirection>;
  updatedAt?: InputMaybe<ISortDirection>;
};

export type ICategoryUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ICategoryWhere = {
  AND?: InputMaybe<Array<ICategoryWhere>>;
  OR?: InputMaybe<Array<ICategoryWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_GT?: InputMaybe<Scalars['DateTime']>;
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_LT?: InputMaybe<Scalars['DateTime']>;
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type ICreateArticlesMutationResponse = {
  __typename?: 'CreateArticlesMutationResponse';
  articles: Array<IArticle>;
  info: ICreateInfo;
};

export type ICreateCategoriesMutationResponse = {
  __typename?: 'CreateCategoriesMutationResponse';
  categories: Array<ICategory>;
  info: ICreateInfo;
};

export type ICreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type ICreateTagsMutationResponse = {
  __typename?: 'CreateTagsMutationResponse';
  info: ICreateInfo;
  tags: Array<ITag>;
};

export type ICreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: ICreateInfo;
  users: Array<IUser>;
};

export type ICredentialsExtendedInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type ICredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type IDateTimeAggregateSelectionNonNullable = {
  __typename?: 'DateTimeAggregateSelectionNonNullable';
  max: Scalars['DateTime'];
  min: Scalars['DateTime'];
};

export type IDateTimeAggregateSelectionNullable = {
  __typename?: 'DateTimeAggregateSelectionNullable';
  max?: Maybe<Scalars['DateTime']>;
  min?: Maybe<Scalars['DateTime']>;
};

export type IDeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesDeleted: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type IIdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID'];
  shortest: Scalars['ID'];
};

export enum ILanguagesEnum {
  English = 'English',
  Russian = 'Russian'
}

export type IMutation = {
  __typename?: 'Mutation';
  createArticles: ICreateArticlesMutationResponse;
  createCategories: ICreateCategoriesMutationResponse;
  createTags: ICreateTagsMutationResponse;
  createUser?: Maybe<IUser>;
  createUsers: ICreateUsersMutationResponse;
  deleteArticles: IDeleteInfo;
  deleteCategories: IDeleteInfo;
  deleteTags: IDeleteInfo;
  deleteUsers: IDeleteInfo;
  loginUser?: Maybe<ITokens>;
  registerAdmin?: Maybe<IUser>;
  updateArticles: IUpdateArticlesMutationResponse;
  updateCategories: IUpdateCategoriesMutationResponse;
  updateTags: IUpdateTagsMutationResponse;
  updateUsers: IUpdateUsersMutationResponse;
};


export type IMutationCreateArticlesArgs = {
  input: Array<IArticleCreateInput>;
};


export type IMutationCreateCategoriesArgs = {
  input: Array<ICategoryCreateInput>;
};


export type IMutationCreateTagsArgs = {
  input: Array<ITagCreateInput>;
};


export type IMutationCreateUserArgs = {
  input?: InputMaybe<ICredentialsExtendedInput>;
};


export type IMutationCreateUsersArgs = {
  input: Array<IUserCreateInput>;
};


export type IMutationDeleteArticlesArgs = {
  where?: InputMaybe<IArticleWhere>;
};


export type IMutationDeleteCategoriesArgs = {
  where?: InputMaybe<ICategoryWhere>;
};


export type IMutationDeleteTagsArgs = {
  where?: InputMaybe<ITagWhere>;
};


export type IMutationDeleteUsersArgs = {
  where?: InputMaybe<IUserWhere>;
};


export type IMutationLoginUserArgs = {
  input?: InputMaybe<ICredentialsInput>;
};


export type IMutationRegisterAdminArgs = {
  input?: InputMaybe<ICredentialsExtendedInput>;
};


export type IMutationUpdateArticlesArgs = {
  update?: InputMaybe<IArticleUpdateInput>;
  where?: InputMaybe<IArticleWhere>;
};


export type IMutationUpdateCategoriesArgs = {
  update?: InputMaybe<ICategoryUpdateInput>;
  where?: InputMaybe<ICategoryWhere>;
};


export type IMutationUpdateTagsArgs = {
  update?: InputMaybe<ITagUpdateInput>;
  where?: InputMaybe<ITagWhere>;
};


export type IMutationUpdateUsersArgs = {
  update?: InputMaybe<IUserUpdateInput>;
  where?: InputMaybe<IUserWhere>;
};

export type IQuery = {
  __typename?: 'Query';
  articles: Array<IArticle>;
  articlesAggregate: IArticleAggregateSelection;
  categories: Array<ICategory>;
  categoriesAggregate: ICategoryAggregateSelection;
  tags: Array<ITag>;
  tagsAggregate: ITagAggregateSelection;
  users: Array<IUser>;
  usersAggregate: IUserAggregateSelection;
};


export type IQueryArticlesArgs = {
  options?: InputMaybe<IArticleOptions>;
  where?: InputMaybe<IArticleWhere>;
};


export type IQueryArticlesAggregateArgs = {
  where?: InputMaybe<IArticleWhere>;
};


export type IQueryCategoriesArgs = {
  options?: InputMaybe<ICategoryOptions>;
  where?: InputMaybe<ICategoryWhere>;
};


export type IQueryCategoriesAggregateArgs = {
  where?: InputMaybe<ICategoryWhere>;
};


export type IQueryTagsArgs = {
  options?: InputMaybe<ITagOptions>;
  where?: InputMaybe<ITagWhere>;
};


export type IQueryTagsAggregateArgs = {
  where?: InputMaybe<ITagWhere>;
};


export type IQueryUsersArgs = {
  options?: InputMaybe<IUserOptions>;
  where?: InputMaybe<IUserWhere>;
};


export type IQueryUsersAggregateArgs = {
  where?: InputMaybe<IUserWhere>;
};

export enum ISortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type IStringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable';
  longest: Scalars['String'];
  shortest: Scalars['String'];
};

export type IStringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']>;
  shortest?: Maybe<Scalars['String']>;
};

export type ITag = {
  __typename?: 'Tag';
  /** Articles with this tag name */
  articles: Array<Maybe<IArticle>>;
  /** Tag created date. */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Tag name. */
  name: Scalars['String'];
  /** Tag updated date. */
  updatedAt: Scalars['DateTime'];
};

export type ITagAggregateSelection = {
  __typename?: 'TagAggregateSelection';
  count: Scalars['Int'];
  createdAt: IDateTimeAggregateSelectionNonNullable;
  id: IIdAggregateSelectionNonNullable;
  name: IStringAggregateSelectionNonNullable;
  updatedAt: IDateTimeAggregateSelectionNonNullable;
};

export type ITagCreateInput = {
  name: Scalars['String'];
};

export type ITagOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ITagSort>>;
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type ITagSort = {
  createdAt?: InputMaybe<ISortDirection>;
  id?: InputMaybe<ISortDirection>;
  name?: InputMaybe<ISortDirection>;
  updatedAt?: InputMaybe<ISortDirection>;
};

export type ITagUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ITagWhere = {
  AND?: InputMaybe<Array<ITagWhere>>;
  OR?: InputMaybe<Array<ITagWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_GT?: InputMaybe<Scalars['DateTime']>;
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_LT?: InputMaybe<Scalars['DateTime']>;
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type ITokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type IUpdateArticlesMutationResponse = {
  __typename?: 'UpdateArticlesMutationResponse';
  articles: Array<IArticle>;
  info: IUpdateInfo;
};

export type IUpdateCategoriesMutationResponse = {
  __typename?: 'UpdateCategoriesMutationResponse';
  categories: Array<ICategory>;
  info: IUpdateInfo;
};

export type IUpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type IUpdateTagsMutationResponse = {
  __typename?: 'UpdateTagsMutationResponse';
  info: IUpdateInfo;
  tags: Array<ITag>;
};

export type IUpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: IUpdateInfo;
  users: Array<IUser>;
};

export type IUser = {
  __typename?: 'User';
  /** User created date. */
  createdAt: Scalars['DateTime'];
  /** User's email. Should be unique */
  email: Scalars['String'];
  id: Scalars['ID'];
  /** User's IP address. */
  ip?: Maybe<Scalars['String']>;
  /** User last log-in date. */
  lastLoggedAt?: Maybe<Scalars['DateTime']>;
  /** User's phone number. Should be unique */
  phone: Scalars['String'];
  /** User updated date. */
  updatedAt: Scalars['DateTime'];
};

export type IUserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int'];
  createdAt: IDateTimeAggregateSelectionNonNullable;
  email: IStringAggregateSelectionNonNullable;
  id: IIdAggregateSelectionNonNullable;
  ip: IStringAggregateSelectionNullable;
  lastLoggedAt: IDateTimeAggregateSelectionNullable;
  phone: IStringAggregateSelectionNonNullable;
  updatedAt: IDateTimeAggregateSelectionNonNullable;
};

export type IUserCreateInput = {
  email: Scalars['String'];
  ip?: InputMaybe<Scalars['String']>;
  lastLoggedAt?: InputMaybe<Scalars['DateTime']>;
  phone: Scalars['String'];
};

export type IUserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<IUserSort>>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type IUserSort = {
  createdAt?: InputMaybe<ISortDirection>;
  email?: InputMaybe<ISortDirection>;
  id?: InputMaybe<ISortDirection>;
  ip?: InputMaybe<ISortDirection>;
  lastLoggedAt?: InputMaybe<ISortDirection>;
  phone?: InputMaybe<ISortDirection>;
  updatedAt?: InputMaybe<ISortDirection>;
};

export type IUserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  ip?: InputMaybe<Scalars['String']>;
  lastLoggedAt?: InputMaybe<Scalars['DateTime']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type IUserWhere = {
  AND?: InputMaybe<Array<IUserWhere>>;
  OR?: InputMaybe<Array<IUserWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_GT?: InputMaybe<Scalars['DateTime']>;
  createdAt_GTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_LT?: InputMaybe<Scalars['DateTime']>;
  createdAt_LTE?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT?: InputMaybe<Scalars['DateTime']>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  email?: InputMaybe<Scalars['String']>;
  email_CONTAINS?: InputMaybe<Scalars['String']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_IN?: InputMaybe<Array<Scalars['String']>>;
  email_NOT?: InputMaybe<Scalars['String']>;
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  ip?: InputMaybe<Scalars['String']>;
  ip_CONTAINS?: InputMaybe<Scalars['String']>;
  ip_ENDS_WITH?: InputMaybe<Scalars['String']>;
  ip_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ip_NOT?: InputMaybe<Scalars['String']>;
  ip_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  ip_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  ip_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ip_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  ip_STARTS_WITH?: InputMaybe<Scalars['String']>;
  lastLoggedAt?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_GT?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lastLoggedAt_LT?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  lastLoggedAt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  phone?: InputMaybe<Scalars['String']>;
  phone_CONTAINS?: InputMaybe<Scalars['String']>;
  phone_ENDS_WITH?: InputMaybe<Scalars['String']>;
  phone_IN?: InputMaybe<Array<Scalars['String']>>;
  phone_NOT?: InputMaybe<Scalars['String']>;
  phone_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  phone_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  phone_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  phone_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  phone_STARTS_WITH?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_GTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_IN?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_LT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_LTE?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT?: InputMaybe<Scalars['DateTime']>;
  updatedAt_NOT_IN?: InputMaybe<Array<Scalars['DateTime']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Article: ResolverTypeWrapper<IArticle>;
  ArticleAggregateSelection: ResolverTypeWrapper<IArticleAggregateSelection>;
  ArticleCreateInput: IArticleCreateInput;
  ArticleOptions: IArticleOptions;
  ArticleSort: IArticleSort;
  ArticleUpdateInput: IArticleUpdateInput;
  ArticleWhere: IArticleWhere;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<ICategory>;
  CategoryAggregateSelection: ResolverTypeWrapper<ICategoryAggregateSelection>;
  CategoryCreateInput: ICategoryCreateInput;
  CategoryOptions: ICategoryOptions;
  CategorySort: ICategorySort;
  CategoryUpdateInput: ICategoryUpdateInput;
  CategoryWhere: ICategoryWhere;
  CreateArticlesMutationResponse: ResolverTypeWrapper<ICreateArticlesMutationResponse>;
  CreateCategoriesMutationResponse: ResolverTypeWrapper<ICreateCategoriesMutationResponse>;
  CreateInfo: ResolverTypeWrapper<ICreateInfo>;
  CreateTagsMutationResponse: ResolverTypeWrapper<ICreateTagsMutationResponse>;
  CreateUsersMutationResponse: ResolverTypeWrapper<ICreateUsersMutationResponse>;
  CredentialsExtendedInput: ICredentialsExtendedInput;
  CredentialsInput: ICredentialsInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DateTimeAggregateSelectionNonNullable: ResolverTypeWrapper<IDateTimeAggregateSelectionNonNullable>;
  DateTimeAggregateSelectionNullable: ResolverTypeWrapper<IDateTimeAggregateSelectionNullable>;
  DeleteInfo: ResolverTypeWrapper<IDeleteInfo>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IDAggregateSelectionNonNullable: ResolverTypeWrapper<IIdAggregateSelectionNonNullable>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LanguagesEnum: ILanguagesEnum;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SortDirection: ISortDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringAggregateSelectionNonNullable: ResolverTypeWrapper<IStringAggregateSelectionNonNullable>;
  StringAggregateSelectionNullable: ResolverTypeWrapper<IStringAggregateSelectionNullable>;
  Tag: ResolverTypeWrapper<ITag>;
  TagAggregateSelection: ResolverTypeWrapper<ITagAggregateSelection>;
  TagCreateInput: ITagCreateInput;
  TagOptions: ITagOptions;
  TagSort: ITagSort;
  TagUpdateInput: ITagUpdateInput;
  TagWhere: ITagWhere;
  Tokens: ResolverTypeWrapper<ITokens>;
  UpdateArticlesMutationResponse: ResolverTypeWrapper<IUpdateArticlesMutationResponse>;
  UpdateCategoriesMutationResponse: ResolverTypeWrapper<IUpdateCategoriesMutationResponse>;
  UpdateInfo: ResolverTypeWrapper<IUpdateInfo>;
  UpdateTagsMutationResponse: ResolverTypeWrapper<IUpdateTagsMutationResponse>;
  UpdateUsersMutationResponse: ResolverTypeWrapper<IUpdateUsersMutationResponse>;
  User: ResolverTypeWrapper<IUser>;
  UserAggregateSelection: ResolverTypeWrapper<IUserAggregateSelection>;
  UserCreateInput: IUserCreateInput;
  UserOptions: IUserOptions;
  UserSort: IUserSort;
  UserUpdateInput: IUserUpdateInput;
  UserWhere: IUserWhere;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Article: IArticle;
  ArticleAggregateSelection: IArticleAggregateSelection;
  ArticleCreateInput: IArticleCreateInput;
  ArticleOptions: IArticleOptions;
  ArticleSort: IArticleSort;
  ArticleUpdateInput: IArticleUpdateInput;
  ArticleWhere: IArticleWhere;
  Boolean: Scalars['Boolean'];
  Category: ICategory;
  CategoryAggregateSelection: ICategoryAggregateSelection;
  CategoryCreateInput: ICategoryCreateInput;
  CategoryOptions: ICategoryOptions;
  CategorySort: ICategorySort;
  CategoryUpdateInput: ICategoryUpdateInput;
  CategoryWhere: ICategoryWhere;
  CreateArticlesMutationResponse: ICreateArticlesMutationResponse;
  CreateCategoriesMutationResponse: ICreateCategoriesMutationResponse;
  CreateInfo: ICreateInfo;
  CreateTagsMutationResponse: ICreateTagsMutationResponse;
  CreateUsersMutationResponse: ICreateUsersMutationResponse;
  CredentialsExtendedInput: ICredentialsExtendedInput;
  CredentialsInput: ICredentialsInput;
  DateTime: Scalars['DateTime'];
  DateTimeAggregateSelectionNonNullable: IDateTimeAggregateSelectionNonNullable;
  DateTimeAggregateSelectionNullable: IDateTimeAggregateSelectionNullable;
  DeleteInfo: IDeleteInfo;
  ID: Scalars['ID'];
  IDAggregateSelectionNonNullable: IIdAggregateSelectionNonNullable;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  StringAggregateSelectionNonNullable: IStringAggregateSelectionNonNullable;
  StringAggregateSelectionNullable: IStringAggregateSelectionNullable;
  Tag: ITag;
  TagAggregateSelection: ITagAggregateSelection;
  TagCreateInput: ITagCreateInput;
  TagOptions: ITagOptions;
  TagSort: ITagSort;
  TagUpdateInput: ITagUpdateInput;
  TagWhere: ITagWhere;
  Tokens: ITokens;
  UpdateArticlesMutationResponse: IUpdateArticlesMutationResponse;
  UpdateCategoriesMutationResponse: IUpdateCategoriesMutationResponse;
  UpdateInfo: IUpdateInfo;
  UpdateTagsMutationResponse: IUpdateTagsMutationResponse;
  UpdateUsersMutationResponse: IUpdateUsersMutationResponse;
  User: IUser;
  UserAggregateSelection: IUserAggregateSelection;
  UserCreateInput: IUserCreateInput;
  UserOptions: IUserOptions;
  UserSort: IUserSort;
  UserUpdateInput: IUserUpdateInput;
  UserWhere: IUserWhere;
};

export type IArticleResolvers<ContextType = any, ParentType extends IResolversParentTypes['Article'] = IResolversParentTypes['Article']> = {
  author?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  categories?: Resolver<Array<IResolversTypes['Category']>, ParentType, ContextType>;
  content?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  header?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  isPublished?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<IResolversTypes['LanguagesEnum'], ParentType, ContextType>;
  publishedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  subheader?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<Maybe<IResolversTypes['Tag']>>, ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IArticleAggregateSelectionResolvers<ContextType = any, ParentType extends IResolversParentTypes['ArticleAggregateSelection'] = IResolversParentTypes['ArticleAggregateSelection']> = {
  content?: Resolver<IResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  count?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  header?: Resolver<IResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  publishedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  subheader?: Resolver<IResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICategoryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Category'] = IResolversParentTypes['Category']> = {
  articles?: Resolver<Array<Maybe<IResolversTypes['Article']>>, ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICategoryAggregateSelectionResolvers<ContextType = any, ParentType extends IResolversParentTypes['CategoryAggregateSelection'] = IResolversParentTypes['CategoryAggregateSelection']> = {
  count?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICreateArticlesMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['CreateArticlesMutationResponse'] = IResolversParentTypes['CreateArticlesMutationResponse']> = {
  articles?: Resolver<Array<IResolversTypes['Article']>, ParentType, ContextType>;
  info?: Resolver<IResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICreateCategoriesMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['CreateCategoriesMutationResponse'] = IResolversParentTypes['CreateCategoriesMutationResponse']> = {
  categories?: Resolver<Array<IResolversTypes['Category']>, ParentType, ContextType>;
  info?: Resolver<IResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICreateInfoResolvers<ContextType = any, ParentType extends IResolversParentTypes['CreateInfo'] = IResolversParentTypes['CreateInfo']> = {
  bookmark?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  nodesCreated?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  relationshipsCreated?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICreateTagsMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['CreateTagsMutationResponse'] = IResolversParentTypes['CreateTagsMutationResponse']> = {
  info?: Resolver<IResolversTypes['CreateInfo'], ParentType, ContextType>;
  tags?: Resolver<Array<IResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ICreateUsersMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['CreateUsersMutationResponse'] = IResolversParentTypes['CreateUsersMutationResponse']> = {
  info?: Resolver<IResolversTypes['CreateInfo'], ParentType, ContextType>;
  users?: Resolver<Array<IResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type IDateTimeAggregateSelectionNonNullableResolvers<ContextType = any, ParentType extends IResolversParentTypes['DateTimeAggregateSelectionNonNullable'] = IResolversParentTypes['DateTimeAggregateSelectionNonNullable']> = {
  max?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  min?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IDateTimeAggregateSelectionNullableResolvers<ContextType = any, ParentType extends IResolversParentTypes['DateTimeAggregateSelectionNullable'] = IResolversParentTypes['DateTimeAggregateSelectionNullable']> = {
  max?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>;
  min?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IDeleteInfoResolvers<ContextType = any, ParentType extends IResolversParentTypes['DeleteInfo'] = IResolversParentTypes['DeleteInfo']> = {
  bookmark?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  nodesDeleted?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  relationshipsDeleted?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IIdAggregateSelectionNonNullableResolvers<ContextType = any, ParentType extends IResolversParentTypes['IDAggregateSelectionNonNullable'] = IResolversParentTypes['IDAggregateSelectionNonNullable']> = {
  longest?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  shortest?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  createArticles?: Resolver<IResolversTypes['CreateArticlesMutationResponse'], ParentType, ContextType, RequireFields<IMutationCreateArticlesArgs, 'input'>>;
  createCategories?: Resolver<IResolversTypes['CreateCategoriesMutationResponse'], ParentType, ContextType, RequireFields<IMutationCreateCategoriesArgs, 'input'>>;
  createTags?: Resolver<IResolversTypes['CreateTagsMutationResponse'], ParentType, ContextType, RequireFields<IMutationCreateTagsArgs, 'input'>>;
  createUser?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, Partial<IMutationCreateUserArgs>>;
  createUsers?: Resolver<IResolversTypes['CreateUsersMutationResponse'], ParentType, ContextType, RequireFields<IMutationCreateUsersArgs, 'input'>>;
  deleteArticles?: Resolver<IResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<IMutationDeleteArticlesArgs>>;
  deleteCategories?: Resolver<IResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<IMutationDeleteCategoriesArgs>>;
  deleteTags?: Resolver<IResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<IMutationDeleteTagsArgs>>;
  deleteUsers?: Resolver<IResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<IMutationDeleteUsersArgs>>;
  loginUser?: Resolver<Maybe<IResolversTypes['Tokens']>, ParentType, ContextType, Partial<IMutationLoginUserArgs>>;
  registerAdmin?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, Partial<IMutationRegisterAdminArgs>>;
  updateArticles?: Resolver<IResolversTypes['UpdateArticlesMutationResponse'], ParentType, ContextType, Partial<IMutationUpdateArticlesArgs>>;
  updateCategories?: Resolver<IResolversTypes['UpdateCategoriesMutationResponse'], ParentType, ContextType, Partial<IMutationUpdateCategoriesArgs>>;
  updateTags?: Resolver<IResolversTypes['UpdateTagsMutationResponse'], ParentType, ContextType, Partial<IMutationUpdateTagsArgs>>;
  updateUsers?: Resolver<IResolversTypes['UpdateUsersMutationResponse'], ParentType, ContextType, Partial<IMutationUpdateUsersArgs>>;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  articles?: Resolver<Array<IResolversTypes['Article']>, ParentType, ContextType, Partial<IQueryArticlesArgs>>;
  articlesAggregate?: Resolver<IResolversTypes['ArticleAggregateSelection'], ParentType, ContextType, Partial<IQueryArticlesAggregateArgs>>;
  categories?: Resolver<Array<IResolversTypes['Category']>, ParentType, ContextType, Partial<IQueryCategoriesArgs>>;
  categoriesAggregate?: Resolver<IResolversTypes['CategoryAggregateSelection'], ParentType, ContextType, Partial<IQueryCategoriesAggregateArgs>>;
  tags?: Resolver<Array<IResolversTypes['Tag']>, ParentType, ContextType, Partial<IQueryTagsArgs>>;
  tagsAggregate?: Resolver<IResolversTypes['TagAggregateSelection'], ParentType, ContextType, Partial<IQueryTagsAggregateArgs>>;
  users?: Resolver<Array<IResolversTypes['User']>, ParentType, ContextType, Partial<IQueryUsersArgs>>;
  usersAggregate?: Resolver<IResolversTypes['UserAggregateSelection'], ParentType, ContextType, Partial<IQueryUsersAggregateArgs>>;
};

export type IStringAggregateSelectionNonNullableResolvers<ContextType = any, ParentType extends IResolversParentTypes['StringAggregateSelectionNonNullable'] = IResolversParentTypes['StringAggregateSelectionNonNullable']> = {
  longest?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  shortest?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IStringAggregateSelectionNullableResolvers<ContextType = any, ParentType extends IResolversParentTypes['StringAggregateSelectionNullable'] = IResolversParentTypes['StringAggregateSelectionNullable']> = {
  longest?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  shortest?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ITagResolvers<ContextType = any, ParentType extends IResolversParentTypes['Tag'] = IResolversParentTypes['Tag']> = {
  articles?: Resolver<Array<Maybe<IResolversTypes['Article']>>, ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ITagAggregateSelectionResolvers<ContextType = any, ParentType extends IResolversParentTypes['TagAggregateSelection'] = IResolversParentTypes['TagAggregateSelection']> = {
  count?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ITokensResolvers<ContextType = any, ParentType extends IResolversParentTypes['Tokens'] = IResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUpdateArticlesMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['UpdateArticlesMutationResponse'] = IResolversParentTypes['UpdateArticlesMutationResponse']> = {
  articles?: Resolver<Array<IResolversTypes['Article']>, ParentType, ContextType>;
  info?: Resolver<IResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUpdateCategoriesMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['UpdateCategoriesMutationResponse'] = IResolversParentTypes['UpdateCategoriesMutationResponse']> = {
  categories?: Resolver<Array<IResolversTypes['Category']>, ParentType, ContextType>;
  info?: Resolver<IResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUpdateInfoResolvers<ContextType = any, ParentType extends IResolversParentTypes['UpdateInfo'] = IResolversParentTypes['UpdateInfo']> = {
  bookmark?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  nodesCreated?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  nodesDeleted?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  relationshipsCreated?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  relationshipsDeleted?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUpdateTagsMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['UpdateTagsMutationResponse'] = IResolversParentTypes['UpdateTagsMutationResponse']> = {
  info?: Resolver<IResolversTypes['UpdateInfo'], ParentType, ContextType>;
  tags?: Resolver<Array<IResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUpdateUsersMutationResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['UpdateUsersMutationResponse'] = IResolversParentTypes['UpdateUsersMutationResponse']> = {
  info?: Resolver<IResolversTypes['UpdateInfo'], ParentType, ContextType>;
  users?: Resolver<Array<IResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  ip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  lastLoggedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>;
  phone?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserAggregateSelectionResolvers<ContextType = any, ParentType extends IResolversParentTypes['UserAggregateSelection'] = IResolversParentTypes['UserAggregateSelection']> = {
  count?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  ip?: Resolver<IResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  lastLoggedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNullable'], ParentType, ContextType>;
  phone?: Resolver<IResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  updatedAt?: Resolver<IResolversTypes['DateTimeAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  Article?: IArticleResolvers<ContextType>;
  ArticleAggregateSelection?: IArticleAggregateSelectionResolvers<ContextType>;
  Category?: ICategoryResolvers<ContextType>;
  CategoryAggregateSelection?: ICategoryAggregateSelectionResolvers<ContextType>;
  CreateArticlesMutationResponse?: ICreateArticlesMutationResponseResolvers<ContextType>;
  CreateCategoriesMutationResponse?: ICreateCategoriesMutationResponseResolvers<ContextType>;
  CreateInfo?: ICreateInfoResolvers<ContextType>;
  CreateTagsMutationResponse?: ICreateTagsMutationResponseResolvers<ContextType>;
  CreateUsersMutationResponse?: ICreateUsersMutationResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DateTimeAggregateSelectionNonNullable?: IDateTimeAggregateSelectionNonNullableResolvers<ContextType>;
  DateTimeAggregateSelectionNullable?: IDateTimeAggregateSelectionNullableResolvers<ContextType>;
  DeleteInfo?: IDeleteInfoResolvers<ContextType>;
  IDAggregateSelectionNonNullable?: IIdAggregateSelectionNonNullableResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  StringAggregateSelectionNonNullable?: IStringAggregateSelectionNonNullableResolvers<ContextType>;
  StringAggregateSelectionNullable?: IStringAggregateSelectionNullableResolvers<ContextType>;
  Tag?: ITagResolvers<ContextType>;
  TagAggregateSelection?: ITagAggregateSelectionResolvers<ContextType>;
  Tokens?: ITokensResolvers<ContextType>;
  UpdateArticlesMutationResponse?: IUpdateArticlesMutationResponseResolvers<ContextType>;
  UpdateCategoriesMutationResponse?: IUpdateCategoriesMutationResponseResolvers<ContextType>;
  UpdateInfo?: IUpdateInfoResolvers<ContextType>;
  UpdateTagsMutationResponse?: IUpdateTagsMutationResponseResolvers<ContextType>;
  UpdateUsersMutationResponse?: IUpdateUsersMutationResponseResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserAggregateSelection?: IUserAggregateSelectionResolvers<ContextType>;
};

