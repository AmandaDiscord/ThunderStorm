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
        type: 0 | 1 | 4 | 5 | 2 | 13 | 6 | -1 | 10 | 11 | 12;
    };
    _patch(data: import("discord-typings").ChannelData): void;
}
export = Channel;
