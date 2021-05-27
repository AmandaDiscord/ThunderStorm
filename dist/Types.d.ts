/// <reference types="node" />
import SnowTransfer from "snowtransfer";
import Constants from "./Constants";
import MessageEmbed from "./structures/MessageEmbed";
import MessageAttachment from "./structures/MessageAttachment";
declare type AnyChannel = import("./structures/DMChannel") | import("./structures/TextChannel") | import("./structures/VoiceChannel") | import("./structures/CategoryChannel") | import("./structures/NewsChannel") | import("./structures/StageChannel");
export interface ClientEvents {
    channelCreate: [AnyChannel];
    channelDelete: [import("./structures/Partial/PartialChannel")];
    channelPinsUpdate: [import("./structures/Partial/PartialChannel"), Date];
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
    interactionCreate: [import("./structures/InteractionMessage")];
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
/**
 * Can be a number, hex string, an RGB array like:
 * ```js
 * [255, 0, 255] // purple
 * ```
 * or one of the following strings:
 * - `DEFAULT`
 * - `WHITE`
 * - `AQUA`
 * - `GREEN`
 * - `BLUE`
 * - `YELLOW`
 * - `PURPLE`
 * - `LUMINOUS_VIVID_PINK`
 * - `GOLD`
 * - `ORANGE`
 * - `RED`
 * - `GREY`
 * - `DARKER_GREY`
 * - `NAVY`
 * - `DARK_AQUA`
 * - `DARK_GREEN`
 * - `DARK_BLUE`
 * - `DARK_PURPLE`
 * - `DARK_VIVID_PINK`
 * - `DARK_GOLD`
 * - `DARK_ORANGE`
 * - `DARK_RED`
 * - `DARK_GREY`
 * - `LIGHT_GREY`
 * - `DARK_NAVY`
 * - `BLURPLE`
 * - `GREYPLE`
 * - `DARK_BUT_NOT_BLACK`
 * - `NOT_QUITE_BLACK`
 * - `RANDOM`
 */
export declare type ColorResolvable = keyof typeof Constants.Colors | number | Array<number>;
/**
 * Data that can be resolved to give a string. This can be:
 * * A string
 * * An array (joined with a new line delimiter to give a string)
 * * Any value
 */
export declare type StringResolvable = string | Array<any> | any;
/**
 * Data that can be resolved to give a Buffer. This can be:
 * * A Buffer
 * * The path to a local file
 * * A URL
 */
export declare type BufferResolvable = string | Buffer;
export declare type MessageOptions = {
    tts?: boolean;
    nonce?: string;
    content?: string;
    embed?: MessageEmbed;
    disableEveryone?: boolean;
    file?: MessageAttachment;
    allowedMentions?: Exclude<Partial<import("@amanda/discordtypings").AllowedMentionsData>, "replied_user">;
    suppress?: boolean;
    buttons?: Array<import("./structures/ButtonRow")>;
};
export declare type InteractionMessageOptions = {
    tts?: boolean;
    content?: string;
    embeds?: Array<MessageEmbed>;
    allowedMentions?: Exclude<Partial<import("@amanda/discordtypings").AllowedMentionsData>, "replied_user">;
    ephemeral?: boolean;
    disableEveryone?: boolean;
    buttons?: Array<import("./structures/ButtonRow")>;
};
export interface ClientOptions {
    disableEveryone?: boolean;
    snowtransfer: SnowTransfer;
    connectTimeout?: number;
}
export declare type FetchMemberOptions = {
    ids?: Array<string>;
    query?: string;
    limit?: number;
    after?: string;
};
/**
 * Represents a field of a MessageEmbed
 */
export declare type EmbedField = {
    /**
     * The name of this field
     */
    name: string;
    /**
     * The value of this field
     */
    value: string;
    /**
     * If this field will be displayed inline
     */
    inline: boolean;
};
export declare type FileOptions = {
    /**
     * File to attach
     */
    attachment: BufferResolvable;
    /**
     * Filename of the attachment
     */
    name?: string;
};
/**
 * Represents the thumbnail of a MessageEmbed
 */
export declare type MessageEmbedThumbnail = {
    /**
     * URL for this thumbnail
     */
    url: string;
    /**
     * ProxyURL for this thumbnail
     */
    proxyURL: string;
    /**
     * Height of this thumbnail
     */
    height: number;
    /**
     * Width of this thumbnail
     */
    width: number;
};
/**
 * Represents the image of a MessageEmbed
 */
export declare type MessageEmbedImage = {
    /**
     * URL for this image
     */
    url: string;
    /**
     * ProxyURL for this image
     */
    proxyURL: string;
    /**
     * Height of this image
     */
    height: number;
    /**
     * Width of this image
     */
    width: number;
};
/**
 * Represents the video of a MessageEmbed
 */
export declare type MessageEmbedVideo = {
    /**
     * URL of this video
     */
    url: string;
    /**
     * ProxyURL for this video
     */
    proxyURL: string;
    /**
     * Height of this video
     */
    height: number;
    /**
     * Width of this video
     */
    width: number;
};
/**
 * Represents the author field of a MessageEmbed
 */
export declare type MessageEmbedAuthor = {
    /**
     * The name of this author
     */
    name: string;
    /**
     * URL of this author
     */
    url: string;
    /**
     * URL of the icon for this author
     */
    iconURL: string;
    /**
     * Proxied URL of the icon for this author
     */
    proxyIconURL: string;
};
/**
 * Represents the provider of a MessageEmbed
 */
export declare type MessageEmbedProvider = {
    /**
     * The name of this provider
     */
    name: string;
    /**
     * URL of this provider
     */
    url: string;
};
/**
 * Represents the footer field of a MessageEmbed
 */
export declare type MessageEmbedFooter = {
    /**
     * The text of this footer
     */
    text: string;
    /**
     * URL of the icon for this footer
     */
    iconURL: string;
    /**
     * Proxied URL of the icon for this footer
     */
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
