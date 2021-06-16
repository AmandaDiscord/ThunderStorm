import TextBasedChannel from "./Interfaces/TextBasedChannel";
import Collection from "../util/Collection";
declare class GuildMember implements TextBasedChannel {
    lastMessageID: TextBasedChannel["lastMessageID"];
    lastMessage: TextBasedChannel["lastMessage"];
    send: TextBasedChannel["send"];
    client: import("../client/Client");
    user: import("./User");
    id: string;
    nickname: string | null;
    deaf: boolean;
    mute: boolean;
    joinedAt: Date;
    joinedTimestamp: number;
    premiumSince: Date | null;
    premiumSinceTimestamp: number | null;
    roles: Collection<string, import("./Partial/PartialRole")>;
    guild: import("./Partial/PartialGuild") | null;
    avatar: string | null;
    hoistRole: import("./Partial/PartialRole") | null;
    presence: import("./Presence").Presence | null;
    lastMessageChannelID: string | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").MemberData & {
        user: import("@amanda/discordtypings").UserData;
        guild_id?: string;
    });
    get displayName(): string;
    /**
     * A combination of the member's tag and nickname
     * - Nickname set:   PapiOphidian#0110 (Async)
     * - Nickname unset: PapiOphidian#0110
     */
    get displayTag(): string;
    createDM(): Promise<import("./DMChannel")>;
    deleteDM(): Promise<import("./DMChannel")>;
    kick(reason?: string): Promise<this>;
    ban(options?: {
        days?: number;
        reason?: string;
    }): Promise<this | undefined>;
    toString(): string;
    toJSON(): {
        id: string;
        nick: string | null;
        mute: boolean;
        joined_at: string;
        premium_since: Date | null;
        user: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
        };
        roles: string[];
        guild_id: string | null;
        hoisted_role: string | null;
    };
    _patch(data: import("@amanda/discordtypings").MemberData & {
        user: import("@amanda/discordtypings").UserData;
        guild_id?: string;
    }): void;
}
export = GuildMember;
