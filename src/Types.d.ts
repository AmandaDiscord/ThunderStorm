/// <reference types="node" />
import Constants from "./util/Constants";
import MessageAttachment from "./structures/MessageAttachment";
import MessageEmbed from "./structures/MessageEmbed";
declare type AnyChannel = import("./structures/DMChannel") | import("./structures/TextChannel") | import("./structures/VoiceChannel") | import("./structures/CategoryChannel") | import("./structures/NewsChannel") | import("./structures/StoreChannel") | import("./structures/StageChannel");
export declare type FlattenIfArray<T> = T extends Array<infer R> ? R : T;
export declare type FlattenIfReadonlyArray<T> = T extends ReadonlyArray<infer R> ? R : T;
export interface ClientEvents {
    channelCreate: [AnyChannel];
    channelDelete: [import("./structures/Partial/PartialChannel")];
    channelPinsUpdate: [import("./structures/Partial/PartialChannel"), Date];
    channelUpdate: [AnyChannel];
    debug: [string];
    guildBanAdd: [import("./structures/GuildBan")];
    guildBanRemove: [import("./structures/GuildBan")];
    guildCreate: [import("./structures/Guild")];
    guildDelete: [import("./structures/Partial/PartialGuild")];
    emojiCreate: [import("./structures/Emoji")];
    emojisUpdate: [import("./structures/Partial/PartialGuild"), import("@discordjs/Collection").Collection<string, import("./structures/Emoji")>];
    guildIntegrationsUpdate: [import("./structures/Partial/PartialGuild")];
    guildMemberAdd: [import("./structures/GuildMember")];
    guildMemberRemove: [import("./structures/GuildMember")];
    guildMembersChunk: [import("@discordjs/Collection").Collection<string, import("./structures/GuildMember")>, import("./structures/Partial/PartialGuild"), {
        index: number;
        count: number;
        nonce: string | null;
    }];
    guildMemberUpdate: [import("./structures/GuildMember")];
    guildUnavailable: [import("./structures/Partial/PartialGuild")];
    guildUpdate: [import("./structures/Guild")];
    interactionCreate: [import("./structures/Interaction")];
    invalidated: [];
    inviteCreate: [import("./structures/Invite")];
    inviteDelete: [import("./structures/Invite")];
    messageCreate: [import("./structures/Message")];
    messageDelete: [import("./structures/Partial/PartialMessage")];
    messageDeleteBulk: [import("@discordjs/Collection").Collection<string, import("./structures/Partial/PartialMessage")>];
    messageReactionAdd: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
    messageReactionRemove: [import("./structures/MessageReaction"), import("./structures/Partial/PartialUser")];
    messageReactionRemoveAll: [import("./structures/Partial/PartialMessage")];
    messageReactionRemoveEmoji: [import("./structures/MessageReaction")];
    messageUpdate: [import("./structures/Message")];
    presenceUpdate: [import("./structures/Presence").Presence];
    rateLimit: [{
        timeout: number;
        limit: number;
        method: string;
        path: string;
        route: string;
    }];
    raw: [import("./internal").InboundDataType<keyof import("./internal").GatewayEventDataTable>];
    ready: [import("./structures/ClientUser")];
    roleCreate: [import("./structures/Role")];
    roleDelete: [import("./structures/Partial/PartialRole")];
    roleUpdate: [import("./structures/Role")];
    shardDisconnect: [{
        code: number;
        reason: string;
        wasClean: boolean;
    }, number];
    shardReady: [number, Set<string>];
    shardResume: [number];
    threadCreate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    threadDelete: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    threadListSync: [import("@discordjs/Collection").Collection<string, import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")>];
    threadMemberUpdate: [import("./structures/ThreadMember")];
    threadMembersUpdate: [import("./structures/Partial/PartialThreadChannel"), {
        added: import("@discordjs/Collection").Collection<string, import("./structures/ThreadMember")>;
        removed: import("@discordjs/Collection").Collection<string, import("./structures/Partial/PartialUser")>;
    }];
    threadUpdate: [import("./structures/ThreadTextChannel") | import("./structures/ThreadNewsChannel")];
    typingStart: [import("./structures/Partial/PartialChannel"), import("./structures/Partial/PartialUser")];
    userUpdate: [import("./structures/User")];
    voiceStateUpdate: [import("./structures/VoiceState")];
    webhookUpdate: [import("./structures/Partial/PartialChannel")];
}
export declare type ChannelType = Exclude<keyof typeof Constants.ChannelTypes, number | "-1"> | "UNKNOWN";
export declare type ChannelResolvable = import("./structures/Channel") | string;
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
export declare type StringResolvable = string | Array<any> | any;
export declare type BufferResolvable = string | Buffer;
export declare type MessageMentionTypes = "roles" | "users" | "everyone";
export declare type MessageMentionOptions = {
    parse?: Array<MessageMentionTypes>;
    users?: Array<string>;
    roles?: Array<string>;
    repliedUser?: boolean;
};
export declare type BaseMessageOptions = {
    tts?: boolean;
    nonce?: string;
    content?: string;
    embeds?: Array<MessageEmbed>;
    disableEveryone?: boolean;
    allowedMentions?: MessageMentionOptions;
    files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
    code?: string | boolean;
    split?: boolean | SplitOptions;
    components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
};
export interface MessageOptions extends BaseMessageOptions {
    reply?: ReplyOptions;
}
export interface WebhookMessageOptions extends BaseMessageOptions {
    username?: string;
    avatarURL?: string;
}
export declare type WebhookEditMessageOptions = {
    embeds?: Array<MessageEmbed>;
    content?: StringResolvable;
    files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
    allowedMentions?: MessageMentionOptions;
    components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
};
export declare type MessageAdditions = MessageEmbed | MessageAttachment | Array<MessageEmbed | MessageAttachment>;
export interface ClientOptions {
    disableEveryone?: boolean;
    snowtransfer: import("snowtransfer").SnowTransfer;
    connectTimeout?: number;
    restGlobalRateLimit?: number;
    restSweepInterval?: number;
}
export declare type FetchMemberOptions = {
    Ids?: Array<string>;
    query?: string;
    limit?: number;
    after?: string;
};
export declare type EmbedField = {
    name: string;
    value: string;
    inline?: boolean;
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
export declare type Feature = import("discord-typings").GuildFeature;
export declare type BitFieldResolvable<T> = number | bigint | keyof T | import("./util/BitField")<T> | Array<BitFieldResolvable<T>>;
export declare type PermissionResolvable = BitFieldResolvable<typeof import("./util/Permissions").FLAGS>;
export declare type UserResolvable = string | import("./structures/User") | import("./structures/GuildMember") | import("./structures/Guild") | import("./structures/Message");
export declare type MessageResolvable = import("./structures/Message") | import("./structures/Partial/PartialMessage") | string;
export declare type ReplyOptions = {
    messageReference: MessageResolvable;
    failIfNotExists?: boolean;
};
export declare type AllowedImageFormat = "webp" | "png" | "jpg" | "jpeg" | "gif";
export declare type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export declare type ImageURLOptions = {
    format?: AllowedImageFormat;
    size?: ImageSize;
};
export declare type MessageActivity = {
    partyId?: string;
    type?: number;
};
export declare type InviteScope = FlattenIfReadonlyArray<typeof Constants.InviteScopes>;
export declare type MessageType = Exclude<FlattenIfReadonlyArray<typeof Constants.MessageTypes>, null>;
export declare type SystemMessageType = Exclude<FlattenIfArray<typeof Constants.SystemMessageTypes>, null>;
export declare type ExplicitContentFilterLevel = FlattenIfReadonlyArray<typeof Constants.ExplicitContentFilterLevels>;
export declare type VerificationLevel = FlattenIfReadonlyArray<typeof Constants.VerificationLevels>;
export declare type DefaultMessageNotification = FlattenIfReadonlyArray<typeof Constants.DefaultMessageNotifications>;
export declare type MembershipState = Exclude<FlattenIfReadonlyArray<typeof Constants.MembershipStates>, null>;
export declare type WebhookType = Exclude<FlattenIfReadonlyArray<typeof Constants.WebhookTypes>, null>;
export declare type PresenceStatus = import("discord-typings").PresenceUpdateData["status"];
export declare type ClientPresenceStatus = Exclude<PresenceStatus, "offline">;
export declare type ActivityType = FlattenIfReadonlyArray<typeof Constants.ActivityTypes>;
export declare type StickerFormatType = Exclude<keyof typeof Constants.StickerFormatTypes, number>;
export declare type ApplicationCommandOptionType = Exclude<keyof typeof Constants.ApplicationCommandOptionTypes, number>;
export declare type ApplicationCommandPermissionType = Exclude<keyof typeof Constants.ApplicationCommandPermissionTypes, number>;
export declare type InteractionType = Exclude<keyof typeof Constants.InteractionTypes, number>;
export declare type InteractionResponseType = Exclude<keyof typeof Constants.InteractionResponseTypes, number>;
export declare type MessageComponentType = Exclude<keyof typeof Constants.MessageComponentTypes, number>;
export declare type MessageButtonStyle = Exclude<keyof typeof Constants.MessageButtonStyles, number>;
export declare type MessageTarget = import("./structures/interfaces/TextBasedChannel") | import("./structures/TextChannel") | import("./structures/DMChannel") | import("./structures/User") | import("./structures/GuildMember") | import("./structures/Webhook") | import("./client/WebhookClient") | import("./structures/Interaction") | import("./structures/Message") | import("./structures/Partial/PartialMessage") | import("./structures/interfaces/InteractionResponses");
export declare type CollectorFilter<T> = (...args: Array<any>, collection: import("@discordjs/Collection").Collection<string, T>) => boolean | Promise<boolean>;
export declare type CollectorOptions = {
    time?: number;
    idle?: number;
    dispose?: boolean;
};
export interface MessageCollectorOptions extends CollectorOptions {
    max?: number;
    maxProcessed?: number;
}
export interface AwaitMessagesOptions extends MessageCollectorOptions {
    errors?: Array<string>;
}
export declare type GuildEmojiEditData = {
    name?: string;
    roles?: import("@discordjs/Collection").Collection<string, import("./structures/Role") | import("./structures/Partial/PartialRole")> | Array<RoleResolvable>;
};
export declare type RoleResolvable = string | import("./structures/Role") | import("./structures/Partial/PartialRole");
export declare type ApplicationAsset = {
    id: string;
    name: string;
    type: string;
};
export declare type ApplicationCommandData = {
    name: string;
    description: string;
    options?: Array<ApplicationCommandOptionData>;
    defaultPermission?: boolean;
};
export declare type ApplicationCommandOptionData = {
    type: ApplicationCommandOptionType | Exclude<keyof typeof Constants.ApplicationCommandOptionTypes, string>;
    name: string;
    description: string;
    required?: boolean;
    choices?: Array<ApplicationCommandOptionChoice>;
    options?: Array<ApplicationCommandOptionData>;
};
export declare type ApplicationCommandOption = {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: Array<ApplicationCommandOptionChoice>;
    options?: Array<ApplicationCommandOption>;
};
export declare type ApplicationCommandOptionChoice = {
    name: string;
    value: string | number;
};
export declare type ApplicationCommandPermissionData = {
    id: string;
    type: ApplicationCommandPermissionType | Exclude<keyof typeof Constants.ApplicationCommandPermissionTypes, string>;
    permission: boolean;
};
export declare type GuildApplicationCommandPermissionData = {
    id: string;
    permissions: Array<ApplicationCommandPermissionData>;
};
export declare type ApplicationCommandPermissions = {
    id: string;
    type: ApplicationCommandPermissionType;
    permission: boolean;
};
export declare type InteractionDeferOptions = {
    ephemeral?: boolean;
};
export interface InteractionReplyOptions extends BaseMessageOptions {
    ephemeral?: boolean;
}
export declare type BaseMessageComponentOptions = {
    type: MessageComponentTypeResolvable | null;
};
export declare type MessageComponentOptions = MessageActionRowOptions | MessageButtonOptions;
export declare type MessageComponent = import("./structures/MessageActionRow") | import("./structures/MessageButton");
export declare type MessageComponentTypeResolvable = Exclude<keyof typeof Constants.MessageComponentTypes, string> | MessageComponentType;
export declare type MessageActionRowComponent = import("./structures/MessageButton");
export declare type MessageActionRowComponentOptions = MessageButtonOptions;
export declare type MessageActionRowComponentResolvable = MessageActionRowComponent | MessageActionRowComponentOptions;
export interface MessageActionRowOptions extends BaseMessageComponentOptions {
    components: Array<MessageActionRowComponentResolvable>;
}
export interface MessageButtonOptions extends BaseMessageComponentOptions {
    label?: string | null;
    customId?: string | null;
    style?: MessageButtonStyleResolvable | null;
    emoji?: EmojiResolvable | null;
    url?: string | null;
    disabled?: boolean | null;
}
export declare type MessageButtonStyleResolvable = Exclude<keyof typeof Constants.MessageButtonStyles, string> | MessageButtonStyle;
export declare type EmojiIdentifierResolvable = string | EmojiResolvable;
export declare type EmojiResolvable = string | import("./structures/GuildEmoji") | import("./structures/ReactionEmoji") | {
    id: string | null;
    name?: string;
    animated?: boolean;
};
export interface MessageComponentInteractionCollectorOptions extends CollectorOptions {
    max?: number;
    maxComponents?: number;
    maxUsers?: number;
}
export declare type DeconstructedSnowflake = {
    timestamp: number;
    date: Date;
    workerId: number;
    processId: number;
    increment: number;
    binary: string;
};
export declare type ApplicationCommandResolvable = import("./structures/ApplicationCommand") | string;
export declare type Base64Resolvable = Buffer | string;
export declare type IntegrationAccount = {
    id: string;
    name: string;
};
export declare type IntegrationEditData = {
    expireBehavior?: number;
    expireGracePeriod?: number;
};
export declare type AuditLogAction = NonNullable<keyof typeof import("./structures/GuildAuditLogs")["Actions"] | typeof import("./structures/GuildAuditLogs")["Actions"][keyof typeof import("./structures/GuildAuditLogs")["Actions"]]>;
export declare type AuditLogTargetType = typeof import("./structures/GuildAuditLogs")["Targets"][keyof typeof import("./structures/GuildAuditLogs")["Targets"]];
export declare type AuditLogEntryTarget = import("./structures/Guild") | import("./structures/Partial/PartialGuild") | import("./structures/Partial/PartialUser") | import("./structures/Partial/PartialRole") | import("./structures/GuildEmoji") | import("./structures/Invite") | import("./structures/Webhook") | import("./structures/Integration") | {
    [key: string]: any;
};
export declare type AuditLogActionType = "CREATE" | "DELETE" | "UPDATE" | "ALL";
export declare type AuditLogChange = {
    key: string;
    old: any;
    new: any;
};
export declare type CommandInteractionOption = {
    name: string;
    type: ApplicationCommandOptionType;
    value?: string | number | boolean;
    options?: import("@discordjs/Collection").Collection<string, CommandInteractionOption>;
    user?: import("./structures/User");
    member?: import("./structures/GuildMember");
    channel?: import("./structures/GuildChannel");
    role?: import("./structures/Role");
};
export interface ReactionCollectorOptions extends CollectorOptions {
    max?: number;
    maxEmojis?: number;
    maxUsers?: number;
}
export declare type SplitOptions = {
    maxLength?: number;
    char?: string | RegExp;
    prepend?: string;
    append?: string;
};
export interface ReplyMessageOptions extends BaseMessageOptions {
    failIfNotExists?: boolean;
}
export declare type MessageEditOptions = {
    content?: string | null;
    embeds?: Array<MessageEmbed>;
    code?: string | boolean;
    allowedMentions?: MessageMentionOptions;
    flags?: import("./util/MessageFlags");
    attachments?: Array<MessageAttachment>;
    files?: Array<FileOptions | BufferResolvable | MessageAttachment>;
    components?: Array<import("./structures/MessageActionRow")> | Array<MessageActionRowOptions> | Array<Array<MessageActionRowComponentResolvable>>;
    disableEveryone?: boolean;
};
export declare type MessageReference = {
    channelId: string;
    guildId: string | null;
    messageId: string | null;
};
export declare type MessageInteraction = {
    id: string;
    type: InteractionType;
    commandName: string;
    user: import("./structures/User");
};
export interface AwaitReactionsOptions extends ReactionCollectorOptions {
    errors?: Array<string>;
}
export declare type ChannelLogsQueryOptions = {
    limit?: number;
    before?: string;
    after?: string;
    around?: string;
};
export declare type NSFWLevel = Exclude<keyof typeof Constants.NSFWLevels, number>;
export declare type SweepFilter<K, V> = (collection: import("./util/LimitedCollection")<K, V>) => null | ((value: V, key: K, collection: import("./util/LimitedCollection")<K, V>) => boolean);
export declare type LimitedCollectionOptions<K, V> = {
    maxSize?: number | null;
    keepOverLimit?: ((value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => boolean) | null;
    sweepFilter?: SweepFilter<K, V> | null;
    sweepInterval?: number | null;
};
export declare type LifetimeFilterOptions<K, V> = {
    lifetime?: number;
    getComparisonTimestamp?: (value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => number;
    excludeFromSweep?: (value: V, key: K, col: import("./util/LimitedCollection")<K, V>) => boolean;
};
export {};
