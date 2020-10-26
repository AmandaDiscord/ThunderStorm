interface FetchData {
    "User": import("../User");
    "Channel": import("../Channel");
    "Guild": import("../Guild");
    "Role": import("../Role");
    "Base": PartialBase<any>;
}
declare class PartialBase<Type extends FetchData[keyof FetchData]> {
    client: import("../Client");
    partial: boolean;
    partialType: keyof FetchData;
    id: string;
    guild?: import("./PartialGuild") | null;
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toJSON(): {
        id: string;
    };
    fetch(): Promise<Type | null>;
}
export = PartialBase;
