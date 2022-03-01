import { Request } from 'express';
// import IContext from '@interfaces/IContext';
// import driver from './driver';

const context = ({ req }: { req: Request }) => {
    return { req };
};

export default context;
