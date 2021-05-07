import Base from "./Base";
declare class Channel extends Base {
    partial: false;
    id: string;
    name: string;
    type: "category" | "dm" | "news" | "text" | "voice" | "stage" | "unknown";
    constructor(data: import("@amanda/discordtypings").ChannelData, client: import("./Client"));
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): {
        id: string;
        name: string;
    };
    _patch(data: import("@amanda/discordtypings").ChannelData): void;
}
export = Channel;
