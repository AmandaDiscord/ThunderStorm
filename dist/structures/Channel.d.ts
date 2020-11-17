declare class Channel {
    client: import("./Client");
    partial: false;
    id: string;
    name: string;
    type: string;
    constructor(data: import("@amanda/discordtypings").ChannelData, client: import("./Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): {
        id: string;
        name: string;
    };
}
export = Channel;
