import HttpStatus from 'http-status-codes';

export interface IError extends Error {
    status: number;
    code?: string;
}

export class GenericError extends Error implements IError {
    name = 'GENERIC';
    status = 0;
}

export class ArgumentError extends GenericError {
    name = 'Argument error';
    code = 'argument_error';
    status = HttpStatus.INTERNAL_SERVER_ERROR;
}

export class EnvError extends GenericError {
    name = 'Environment variable error';
    code = 'missing_variable';
    status = HttpStatus.INTERNAL_SERVER_ERROR;
}

export class VkError extends GenericError {
    name = 'Token Error';
    code = 'invalid_grant';
    status = HttpStatus.INTERNAL_SERVER_ERROR;
}

export class UnauthorizedError extends GenericError {
    name = 'UNAUTHORIZED';
    code = 'UNAUTHORIZED';
    status = HttpStatus.UNAUTHORIZED;
}

export class ForbiddenError extends GenericError {
    name = 'FORBIDDEN';
    status = HttpStatus.FORBIDDEN;
}

export class InternalUseOnlyError extends GenericError {
    name = 'INTERNAL_USE_ONLY';
    code = 'internal_use_only';
    status = HttpStatus.FORBIDDEN;
}
