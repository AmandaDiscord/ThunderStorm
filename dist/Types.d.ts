/// <reference types="node" />
import SnowTransfer from "snowtransfer";
import Constants from "./Constants";
import MessageEmbed from "./structures/MessageEmbed";
import MessageAttachment from "./structures/MessageAttachment";
export interface ClientEvents {
    channelCreate: [import("./structures/DMChannel") | import("./structures/TextChannel") | import("./structures/VoiceChannel") | import("./structures/CategoryChannel") | import("./structures/NewsChannel")];
    guildCreate: [import("./structures/Guild")];
    guildDelete: [import("./structures/Partial/PartialGuild")];
    guildEmojisUpdate: [import("./structures/Role")];
    guildMemberUpdate: [import("./structures/GuildMember")];
    guildRoleCreate: [import("./structures/Role")];
    guildRoleDelete: [import("./structures/Partial/PartialRole")];
    guildRoleUpdate: [import("./structures/Role")];
    message: [import("./structures/Message")];
    messageDelete: [import("@amanda/discordtypings").MessageDeleteData];
    messageUpdate: [import("./structures/Message")];
    messageReactionAdd: [import("@amanda/discordtypings").MessageReactionAddData];
    messageReactionRemove: [import("@amanda/discordtypings").MessageReactionRemoveData];
    messageReactionRemoveAll: [import("@amanda/discordtypings").MessageReactionRemoveAllData];
    raw: [import("./internal").InboundDataType<keyof import("./internal").CloudStormEventDataTable>];
    ready: [import("./structures/ClientUser")];
    shardReady: [number];
    shardResume: [number];
    shardDisconnect: [number, string, boolean];
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
export declare type BitFieldResolvable<T> = number | bigint | keyof T | Array<BitFieldResolvable<T>>;
export declare type PermissionResolvable = BitFieldResolvable<typeof Constants.PERMISSION_FLAGS>;
