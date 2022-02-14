import Base from "./Base";
declare class Channel extends Base {
    partial: false;
    id: string;
    name: string;
    type: import("../Types").ChannelType;
    static readonly default: typeof Channel;
    constructor(client: import("../client/Client"), data: import("discord-typings").ChannelData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): {
        id: string;
        name: string;
        type: 0 | 2 | 1 | 4 | 11 | 6 | -1 | 5 | 10 | 12 | 13;
    };
    _patch(data: import("discord-typings").ChannelData): void;
}
export = Channel;
