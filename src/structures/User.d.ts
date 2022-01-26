import TextBasedChannel from "./interfaces/TextBasedChannel";
import Base from "./Base";
import UserFlags from "../util/UserFlags";
declare class User extends Base implements TextBasedChannel {
    lastMessageId: TextBasedChannel["lastMessageId"];
    lastMessage: TextBasedChannel["lastMessage"];
    send: TextBasedChannel["send"];
    partial: false;
    username: string;
    discriminator: string;
    bot: boolean;
    id: string;
    avatar: string | null;
    flags: Readonly<UserFlags>;
    system: boolean;
    dmChannel: import("./DMChannel") | null;
    presence: import("./Presence").Presence | null;
    lastMessageChannelId: string | null;
    static readonly default: typeof User;
    constructor(client: import("../client/Client"), data: import("discord-typings").UserData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get tag(): string;
    get defaultAvatarURL(): string;
    toString(): string;
    toJSON(): {
        username: string;
        discriminator: string;
        bot: boolean;
        id: string;
        avatar: string | null;
        public_flags: number;
    };
    avatarURL(options?: import("../Types").ImageURLOptions & {
        dynamic?: boolean;
    }): string | null;
    createDM(): Promise<import("./DMChannel")>;
    deleteDM(): Promise<import("./DMChannel")>;
    displayAvatarURL(options?: import("../Types").ImageURLOptions & {
        dynamic?: boolean;
    }): string | null;
    equals(user: User): boolean;
    fetchFlags(force?: boolean): Promise<Readonly<UserFlags>>;
    fetch(): Promise<this>;
    _patch(data: import("discord-typings").UserData): void;
}
export = User;
