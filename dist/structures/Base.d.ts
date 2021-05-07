declare class Base {
    id: string;
    client: import("./Client");
    constructor(data: {
        id: string;
    }, client: import("./Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    toJSON(): {
        id: string;
    };
    _patch(data: {
        id: string;
    }): void;
}
export = Base;
