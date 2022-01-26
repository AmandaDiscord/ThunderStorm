declare type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];
declare class APIRequest {
    rest: import("./RESTManager");
    client: import("../client/BaseClient");
    method: HTTPMethod;
    route: string;
    options: import("../internal").RestOptions;
    retries: number;
    path: string;
    static readonly default: typeof APIRequest;
    constructor(rest: import("./RESTManager"), method: HTTPMethod, path: string, options: import("../internal").RestOptions);
    make(): Promise<any>;
}
export = APIRequest;
