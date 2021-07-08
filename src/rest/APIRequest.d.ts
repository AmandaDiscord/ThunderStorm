declare type Options = {
    route: string;
    data?: any;
    auth?: boolean;
    versioned?: boolean;
    query?: any;
    reason?: string;
    headers?: any;
    files?: Array<any>;
};
declare type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];
declare class APIRequest {
    rest: import("./RESTManager");
    client: import("../client/BaseClient");
    method: HTTPMethod;
    route: string;
    options: Options;
    retries: number;
    path: string;
    constructor(rest: import("./RESTManager"), method: HTTPMethod, path: string, options: Options);
    make(): Promise<any>;
}
export = APIRequest;
