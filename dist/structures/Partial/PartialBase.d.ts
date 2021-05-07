interface FetchData {
    "Base": PartialBase<any>;
    "Channel": import("../Channel");
    "Guild": import("../Guild");
    "Message": import("../Message");
    "Role": import("../Role");
    "Thread": import("../ThreadTextChannel") | import("../ThreadNewsChannel");
    "User": import("../User");
}
declare class PartialBase<Type extends FetchData[keyof FetchData]> {
    client: import("../Client");
    partial: boolean;
    partialType: keyof FetchData;
    id: string;
    guild?: import("./PartialGuild") | null;
    channel?: import("./PartialChannel");
    parent?: import("./PartialChannel");
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    toJSON(): {
        id: string;
    };
    fetch(): Promise<Type | null>;
}
export = PartialBase;
