import { Neo4jGraphQL } from '@neo4j/graphql';
import { EnvError } from '../utilities/errors';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';
import { Neo4jGraphQLAuthJWTPlugin } from '@neo4j/graphql-plugin-auth';
import driver from './driver';
import { dbName, dbTestName } from '../constants';

const secret = process.env.NODE_ENV === 'test' ? 'very_secretely_secret' : process.env.JWT_SECRET;
const noVerify = process.env.NO_VERIFY === 'true' ? true : false;

if (!secret) {
    throw new EnvError('No JWT secret set');
}

const schemaConfig = {
    typeDefs,
    driver,
    driverConfig: {
        database: process.env.NODE_ENV === 'test' ? dbTestName : dbName
    },
    plugins: {
        auth: new Neo4jGraphQLAuthJWTPlugin({
            secret,
            noVerify
        })
    },
    resolvers
};

const neo4jGraphqlSchema = new Neo4jGraphQL(schemaConfig);

export default neo4jGraphqlSchema;
