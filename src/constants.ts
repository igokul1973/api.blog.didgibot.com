const dbProtocol = 'neo4j';
const dbHost = process.env.NEO4J_DB_HOST || 'localhost';
const dbPort = process.env.NEO4J_DB_BOLT_PORT || 7687;
const dbUser = process.env.NEO4J_DB_USER || '';
const dbPassword = process.env.NEO4J_DB_PASSWORD || '';
const dbName = process.env.NEO4J_DB_NAME || 'bron';
const dbTestName = process.env.NEO4J_TEST_DB_NAME || 'test';
const webHost = process.env.HOST || 'localhost';
const webPort = process.env.PORT || 'http';
const webProtocol = process.env.PROTOCOL || 4000;

export { dbProtocol, dbHost, dbPort, dbUser, dbPassword, dbName, dbTestName, webPort, webProtocol, webHost };
