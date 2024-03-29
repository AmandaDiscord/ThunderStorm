import AnonymousGuild from "./AnonymousGuild";
import { Collection } from "@discordjs/collection";
import Emoji from "./Emoji";
import GuildMember from "./GuildMember";
import Role from "./Role";
import SystemChannelFlags from "../util/SystemChannelFlags";
import VoiceState from "./VoiceState";
import WelcomeScreen from "./WelcomeScreen";
import GuildApplicationCommandManager from "../managers/GuildApplicationCommandManager";
declare class Guild extends AnonymousGuild {
    partial: false;
    name: string;
    id: string;
    available: boolean;
    memberCount: number;
    approximateMemberCount: number;
    approximatePresenceCount: number;
    ownerId: string;
    owner: import("./Partial/PartialUser");
    icon: string | null;
    discoverySplash: string | null;
    large: boolean;
    applicationId: string | null;
    afkTimeout: number;
    afkChannelId: string | null;
    systemChannelId: string | null;
    systemChannelFlags: Readonly<SystemChannelFlags>;
    premiumTier: number;
    premiumSubscriptionCount: number;
    rulesChannelId: string | null;
    publicUpdatesChannelId: string | null;
    preferredLocale: string;
    members: Collection<string, GuildMember>;
    channels: Collection<string, import("./GuildChannel")>;
    roles: Collection<string, Role>;
    voiceStates: Collection<string, VoiceState>;
    emojis: Collection<string, Emoji>;
    defaultMessageNotifications: "ALL" | "MENTIONS";
    mfaLevel: 0 | 1;
    maximumMembers: number;
    maximumPresences: number;
    shardId: number;
    threads: Collection<string, import("./ThreadTextChannel") | import("./ThreadNewsChannel")>;
    stageInstances: Collection<string, import("./Partial/PartialChannel")>;
    joinedTimestamp: number;
    commands: GuildApplicationCommandManager;
    static readonly default: typeof Guild;
    constructor(client: import("../client/Client"), data: import("discord-typings").GuildData);
    get joinedAt(): Date;
    get me(): GuildMember;
    fetchWelcomeScreen(): Promise<WelcomeScreen>;
    bannerURL(options?: import("../Types").ImageURLOptions): void | null;
    toJSON(): {
        name: string;
        id: string;
        unavailable: boolean;
        member_count: number;
        approximate_member_count: number;
        approximate_presence_count: number;
        owner_id: string;
        icon: string | null;
        banner: string | null;
        description: string | null;
        discovery_splash: string | null;
        features: import("discord-typings").GuildFeature[];
        large: boolean;
        splash: string | null;
        application_id: string | null;
        afk_timeout: number;
        afk_channel_id: string | null;
        system_channel_id: string | null;
        premium_tier: number;
        premium_subscription_count: number;
        system_channel_flags: number;
        vanity_url_code: string | null;
        rules_channel_id: string | null;
        preferred_locale: string;
        members: {
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
        }[];
        channels: (import("discord-typings").GuildChannelData & {
            name: string;
        })[];
        roles: {
            name: string;
            id: string;
            color: number;
            managed: boolean;
            hoist: boolean;
            permissions: string;
            position: number;
            mentionable: boolean;
            guild_id: string | undefined;
        }[];
        voice_states: {
            channel_id: string | null;
            guild_id: string | null;
            member: {
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
            } | null;
            deaf: boolean;
            self_deaf: boolean;
            mute: boolean;
            self_mute: boolean;
            session_id: string;
            self_stream: boolean;
            suppress: boolean;
            user_id: string;
        }[];
        emojis: {
            id: string;
            animated: boolean;
            name: string;
        }[];
    };
    fetchMembers(options: string): Promise<import("./GuildMember") | null>;
    fetchMembers(options: import("../Types").FetchMemberOptions): Promise<Array<import("./GuildMember")> | null>;
    fetchInvites(): Promise<Collection<string, import("./Invite")>>;
    _patch(data: import("discord-typings").GuildData): void;
}
export = Guild;
