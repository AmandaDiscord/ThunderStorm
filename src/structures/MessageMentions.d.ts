import { Collection } from "@discordjs/collection";
import GuildMember from "./GuildMember";
import User from "./User";
declare class MessageMentions {
    static EVERYONE_PATTERN: RegExp;
    static USERS_PATTERN: RegExp;
    static ROLES_PATTERN: RegExp;
    static CHANNELS_PATTERN: RegExp;
    client: import("../client/Client");
    guild: import("./Partial/PartialGuild") | null;
    private _content;
    everyone: boolean;
    users: Collection<string, User>;
    members: Collection<string, GuildMember>;
    channels: Collection<string, import("./Partial/PartialChannel")>;
    roles: Collection<string, import("./Partial/PartialRole")>;
    crosspostedChannels: Collection<string, import("./GuildChannel")>;
    static readonly default: typeof MessageMentions;
    constructor(message: import("./Message"), users: Array<import("discord-typings").UserData & {
        member?: import("discord-typings").MemberData;
    }> | undefined, roles: Array<string> | undefined, everyone: boolean, crosspostedChannels: Array<import("discord-typings").ChannelMentionData> | undefined);
    toJSON(): {
        mentions: (import("discord-typings").UserData & {
            member?: import("discord-typings").MemberData | undefined;
        })[];
        mention_roles: string[];
        mention_everyone: boolean;
        mention_channels: import("discord-typings").ChannelMentionData[];
    };
}
export = MessageMentions;
