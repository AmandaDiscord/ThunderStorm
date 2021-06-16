declare abstract class Base {
    client: import("../client/Client");
    id: string;
    constructor(client: import("../client/Client"));
    _clone(): this;
    _patch(data: any): any;
    _update(data: any): this;
    toJSON(...props: Array<Record<keyof this, string | boolean>>): any;
    valueOf(): string;
}
export = Base;
