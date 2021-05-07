/// <reference types="node" />
import SnowTransfer from "snowtransfer";
import Constants from "./Constants";
import MessageEmbed from "./structures/MessageEmbed";
import MessageAttachment from "./structures/MessageAttachment";
declare type AnyChannel = import("./structures/DMChannel") | import("./structures/TextChannel") | import("./structures/VoiceChannel") | import("./structures/CategoryChannel") | import("./structures/NewsChannel") | import("./structures/StageChannel");
export interface ClientEvents {
    channelCreate: [AnyChannel];
    channelDelete: [import("./structures/Partial/PartialChannel")];
    channelPinsUpdate: [import("@amanda/discordtypings").ChannelPinData];
    channelUpdate: [AnyChannel];
    guildBanAdd: [import("./structures/Partial/PartialGuild"), import("./structures/User")];
    guildBanRemove: [import("./structures/Partial/PartialGuild"), import("./structures/User")];
    guildCreate: [import("./structures/Guild")];
    guildDelete: [import("./structures/Partial/PartialGuild")];
    emojisUpdate: [import("./structures/Partial/PartialGuild"), import("./structures/Util/Collection")<string, import("./structures/Emoji")>];
    guildMembersChunk: [import("./structures/Util/Collection")<string, import("./structures/GuildMember")>, import("./structures/Partial/PartialGuild"), {
        index: number;
        count: number;
        nonce: string | null;
    }];
    guildMemberAdd: [import("./structures/GuildMember")];
    guildMemberRemove: [import("./structures/GuildMember")];
    guildMemberUpdate: [import("./structures/GuildMember")];
    guildRoleCreate: [import("./structures/Role")];
    guildRoleDelete: [import("./structures/Partial/PartialRole")];
    guildRoleUpdate: [import("./structures/Role")];
    guildUnavailable: [import("./structures/Partial/PartialGuild")];
    guildUpdate: [import("./structures/Guild")];
    invalidated: [];
    inviteCreate: [import("./structures/Invite")];
    inviteDelete: [import("./structures/Invite")];
    message: [import("./structures/Message")];
    messageDelete: [import("./structures/Partial/PartialMessage")];
    messageDeleteBulk: [import("./structures/Util/Collection")<string, import("./structures/Partial/PartialMessage")>];
    messageUpdate: [import("./structures/Message")];
    messageReactionAdd: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
    messageReactionRemove: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
    messageReactionRemoveAll: [import("./structures/Partial/PartialMessage")];
    messageReactionRemoveEmoji: [import("./structures/MessageReaction")];
    rateLimit: [{
        timeout: number;
        limit: number;
        method: string;
        path: string;
        route: string;
    }];
    raw: [import("./internal").InboundDataType<keyof import("./internal").CloudStormEventDataTable>];
    ready: [import("./structures/ClientUser")];
    shardReady: [number, Set<string>];
    shardResume: [number];
    shardDisconnect: [{
        code: number;
        reason: string;
        wasClean: boolean;
    }, number];
    threadCreate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    threadDelete: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    threadListSync: [import("./structures/Partial/PartialGuild"), import("./structures/Util/Collection")<string, import("./structures/Partial/PartialChannel")>, import("./structures/Util/Collection")<string, import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")>];
    threadMemberUpdate: [import("./structures/ThreadMember")];
    threadMembersUpdate: [import("./structures/Partial/PartialThreadChannel"), {
        added: import("./structures/Util/Collection")<string, import("./structures/ThreadMember")>;
        removed: import("./structures/Util/Collection")<string, import("./structures/Partial/PartialUser")>;
    }];
    threadUpdate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    typingStart: [import("./structures/Partial/PartialChannel"), import("./structures/Partial/PartialUser")];
    userUpdate: [import("./structures/User")];
    voiceStateUpdate: [import("./structures/VoiceState")];
}
export declare type ColorResolvable = keyof typeof Constants.Colors | number | Array<number>;
export declare type StringResolvable = string | Array<any> | any;
export declare type BufferResolvable = string | Buffer;
export declare type MessageOptions = {
    tts?: boolean;
    nonce?: string;
    content?: string;
    embed?: MessageEmbed;
    disableEveryone?: boolean;
    file?: MessageAttachment;
};
export interface ClientOptions {
    disableEveryone?: boolean;
    snowtransfer: SnowTransfer;
}
export declare type FetchMemberOptions = {
    ids?: Array<string>;
    query?: string;
    limit?: number;
    after?: string;
};
export declare type EmbedField = {
    name: string;
    value: string;
    inline: boolean;
};
export declare type FileOptions = {
    attachment: BufferResolvable;
    name?: string;
};
export declare type MessageEmbedThumbnail = {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
};
export declare type MessageEmbedImage = {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
};
export declare type MessageEmbedVideo = {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
};
export declare type MessageEmbedAuthor = {
    name: string;
    url: string;
    iconURL: string;
    proxyIconURL: string;
};
export declare type MessageEmbedProvider = {
    name: string;
    url: string;
};
export declare type MessageEmbedFooter = {
    text: string;
    iconURL: string;
    proxyIconURL: string;
};
export declare type EmbedFieldData = {
    name: StringResolvable;
    value: StringResolvable;
    inline?: boolean;
};
export declare type Feature = "ANIMATED_ICON" | "BANNER" | "COMMERCE" | "COMMUNITY" | "DISCOVERABLE" | "FEATURABLE" | "INVITE_SPLASH" | "NEWS" | "PARTNERED" | "RELAY_ENABLED" | "VANITY_URL" | "VERIFIED" | "VIP_REGIONS" | "WELCOME_SCREEN_ENABLED";
export declare type BitFieldResolvable<T> = number | bigint | keyof T | import("./structures/BitField")<T> | Array<BitFieldResolvable<T>>;
export declare type PermissionResolvable = BitFieldResolvable<typeof Constants.PERMISSION_FLAGS>;
export declare type UserResolvable = string | import("./structures/User") | import("./structures/GuildMember") | import("./structures/Guild") | import("./structures/Message");
export {};
