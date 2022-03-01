import { OGM } from '@neo4j/graphql-ogm';
import { dbName, dbTestName } from '../constants';
import driver from './driver';
import typeDefs from '../typeDefs';

const ogm = new OGM({
    typeDefs,
    driver,
    config: {
        driverConfig: {
            database: process.env.NODE_ENV === 'test' ? dbTestName : dbName
        }
    }
});

export default ogm;
