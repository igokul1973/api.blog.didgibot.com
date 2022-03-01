import * as neo4j from 'neo4j-driver';
import { dbProtocol, dbHost, dbPort, dbUser, dbPassword } from '../constants';

const driver = neo4j.driver(`${dbProtocol}://${dbHost}:${dbPort}`, neo4j.auth.basic(dbUser, dbPassword));

export default driver;
