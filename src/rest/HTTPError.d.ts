declare type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];
declare class HTTPError extends Error {
    code: number;
    method: HTTPMethod;
    path: string;
    static readonly default: typeof HTTPError;
    constructor(message: string, name: string, code: number, method: HTTPMethod, path: string);
}
export = HTTPError;
