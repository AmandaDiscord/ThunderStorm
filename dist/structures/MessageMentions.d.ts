import Collection from "./Util/Collection";
declare class MessageMentions {
    static EVERYONE_PATTERN: RegExp;
    static USERS_PATTERN: RegExp;
    static ROLES_PATTERN: RegExp;
    static CHANNELS_PATTERN: RegExp;
    client: import("./Client");
    guild: import("./Partial/PartialGuild") | null;
    private _content;
    everyone: boolean;
    users: Collection<string, import("./User")>;
    members: Collection<string, import("./GuildMember")>;
    channels: Collection<string, import("./Partial/PartialChannel")>;
    roles: Collection<string, import("./Partial/PartialRole")>;
    crossPostedChannels: Collection<string, import("./GuildChannel")>;
    constructor(message: import("./Message"), users: Array<import("@amanda/discordtypings").UserData & {
        member?: import("@amanda/discordtypings").MemberData;
    }> | undefined, roles: Array<string> | undefined, everyone: boolean, crosspostedChannels: Array<import("@amanda/discordtypings").ChannelMentionData> | undefined);
    toJSON(): {
        mentions: (import("@amanda/discordtypings").UserData & {
            member?: import("@amanda/discordtypings").MemberData | undefined;
        })[];
        mention_roles: string[];
        mention_everyone: boolean;
        mention_channels: import("@amanda/discordtypings").ChannelMentionData[];
    };
}
export = MessageMentions;
