import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
// import { authRouter } from './routes/api/auth';
// import vKontakteStrategy from './passport/vk';
import { IncomingMessage } from 'http';
import { IError } from '@utilities/errors';

const app = express();
app.use(
    express.urlencoded({
        extended: true,
        limit: '20mb'
    })
);
app.use(express.json({ limit: '20mb' }));
app.use(passport.initialize());

// passport.use(vKontakteStrategy);

interface IUser extends Express.User {
    id: string;
    username: string;
    dob: string;
}

// User session support for our hypothetical `user` objects.
passport.serializeUser<string>(function (
    _: IncomingMessage,
    user: Express.User,
    done: (err: unknown, id?: string) => void
) {
    done(null, (user as IUser).id);
});

passport.deserializeUser(function (_, done) {
    done(null, { dob: 'h', userName: 'hua' });
});

const router = express.Router();

app.use('/', router);

router.get('/', (_: Request, res: Response) => {
    res.redirect('/graphql');
});

// router.use('/auth', authRouter);

function errorHandler(error: IError, _: Request, res: Response, next: NextFunction) {
    // Error from VK upon login
    if (error.name === 'TokenError' && error.code === 'invalid_grant') {
        console.error('Error in the VK: ', error);
        return res.send({
            error: {
                message: `VK API error: ${error.message}. Please try to log back into VK.`,
                status: error.status,
                code: error.code
            }
        });
    }
    // Error for external requests of internal resources
    if (error.code === 'internal_use_only') {
        return res.send({
            error: {
                message: 'Access forbidden - this request is for internal use only',
                status: error.status,
                code: error.code
            }
        });
    }
    // All uncaught errors will be handled generically and logged to the console
    console.error(error);
    res.send({
        error: {
            message: 'Server error occurred. Please contact server administrator',
            status: error.status || 500
        }
    });
    return next();
}

app.use(errorHandler);

export default app;
