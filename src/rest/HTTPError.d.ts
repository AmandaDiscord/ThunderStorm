declare type HTTPMethod = Parameters<import("snowtransfer/dist/src/RequestHandler")["request"]>[1];
declare class HTTPError extends Error {
    code: number;
    method: HTTPMethod;
    path: string;
    constructor(message: string, name: string, code: number, method: HTTPMethod, path: string);
}
export = HTTPError;
