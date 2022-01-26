declare class RequestHandler {
    manager: import("./RESTManager");
    queue: Record<string, never>;
    reset: number;
    remaining: number;
    limit: number;
    static readonly default: typeof RequestHandler;
    constructor(manager: import("./RESTManager"));
    push(request: import("./APIRequest")): Promise<any>;
    get globalLimited(): boolean;
    get localLimited(): boolean;
    get limited(): boolean;
    get _inactive(): boolean;
    globalDelayFor(ms: number): Promise<void>;
    execute(request: import("./APIRequest")): Promise<any>;
}
export = RequestHandler;
