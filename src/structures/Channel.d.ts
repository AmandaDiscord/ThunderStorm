import Base from "./Base";
declare class Channel extends Base {
    partial: false;
    id: string;
    name: string;
    type: "category" | "dm" | "news" | "text" | "voice" | "stage" | "store" | "unknown";
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").ChannelData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): {
        id: string;
        name: string;
        type: 0 | 2 | 1 | 4 | 11 | 6 | 5 | 10 | 12 | 13;
    };
    _patch(data: import("@amanda/discordtypings").ChannelData): void;
}
export = Channel;
