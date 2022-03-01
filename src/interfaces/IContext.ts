import * as neo4j from 'neo4j-driver';
import { Request } from 'express';

export default interface IContext {
    driver: neo4j.Driver;
    driverConfig: {
        database: string;
    };
    // neo4jDatabase: string;
    req?: Request;
}
