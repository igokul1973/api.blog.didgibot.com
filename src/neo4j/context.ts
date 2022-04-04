import { Request } from 'express';

const context = ({ req }: { req: Request }) => {
    return { req };
};

export default context;
