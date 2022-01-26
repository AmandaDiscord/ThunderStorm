declare abstract class Base {
    client: import("../client/Client");
    id: string;
    static readonly default: typeof Base;
    constructor(client: import("../client/Client"));
    _clone(): this;
    _patch(data: any): any;
    _update(data: any): this;
    toJSON<K extends keyof this>(...props: Array<{
        [P in K]: string | boolean;
    }>): any;
    valueOf(): string;
}
export = Base;
