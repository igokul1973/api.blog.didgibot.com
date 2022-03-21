import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
// Import DotEnv configuration
const dotenvConfig = config();

dotenvExpand.expand(dotenvConfig);
if (dotenvConfig.error) {
    console.error(
        'You seem to have problems with .env file. If it does not exist - please create one from .env-dist file and fill it in with appropriate data'
    );
    throw dotenvConfig.error;
}
import http from 'http';
import HttpStatus from 'http-status-codes';
import app from './app';
import { dbHost, dbName, dbPort, dbProtocol, webHost, webPort, webProtocol } from './constants';
import { ICredentialsExtendedInput } from '@src/interfaces/ICredentialsExtendedInput';
import context from './neo4j/context';
import neo4jGraphqlSchema from './neo4j/neo4jGraphqlSchema';
import ogm from './neo4j/ogm';
import { EnvError } from './utilities/errors';
import registerAdmin from './utilities/registerAdmin';

Promise.all([neo4jGraphqlSchema.getSchema(), ogm.init()]).then(async ([schema]) => {
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        context,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    app.set('port', webPort);

    server.applyMiddleware({
        app
        /* cors: {
            origin: ['http://localhost:3000', 'http://127.0.0.1:3000', /192\.168\.10\.],
            methods: "GET,HEAD,POST",
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true
        } */
    });

    await new Promise<void>((resolve) => httpServer.listen({ port: app.get('port') }, resolve));

    console.info(`🚀  Server is ready at ${webProtocol}://${webHost}:${webPort}${server.graphqlPath}`);
    console.info(`🚀  Connected to DB - ${dbName} at ${dbProtocol}://${dbHost}:${dbPort}`);

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const phone = process.env.ADMIN_PHONE;

    if (!email || !password || !phone) {
        throw new EnvError();
    }
    const admin: ICredentialsExtendedInput = {
        email,
        password,
        phone
    };

    try {
        await registerAdmin(admin);
        console.log(
            `The blog admin with email: ${email}, password: ${password} and phone: ${phone} has successfully been created.`
        );
    } catch (error) {
        if ((error.status = HttpStatus.UNAUTHORIZED)) {
            console.log('The blog admin already exists');
        } else {
            console.log(error);
        }
    }
});
