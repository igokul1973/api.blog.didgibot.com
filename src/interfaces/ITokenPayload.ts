export default interface ITokenPayload {
    id: string;
    email: string;
    exp?: number;
    iat?: number;
    iss?: string;
}
