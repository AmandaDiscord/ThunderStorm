declare class InteractionMessage {
    client: import("./Client");
    type: "ping" | "command" | "button";
    id: string;
    applicationID: string;
    channel: import("./Partial/PartialChannel") | null;
    guild: import("./Partial/PartialGuild") | null;
    member: import("./GuildMember") | null;
    author: import("./User");
    command: import("./InteractionCommand") | null;
    component: {
        id: string;
        type: 1 | 2;
    } | null;
    token: string;
    version: number;
    message: import("./Message") | null;
    constructor(data: import("@amanda/discordtypings").InteractionData, client: import("./Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    /**
     * ACK an interaction ping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     * Alternatively, return { type: 1 } in your route handler.
     */
    pong(): Promise<void>;
    /**
     * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     */
    reply(content: import("../Types").StringResolvable, options?: import("../Types").InteractionMessageOptions): Promise<any>;
    /**
     * For the most part, equivalent to TextableChannel.sendTyping. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
     */
    think(): Promise<void>;
    getOriginal(): Promise<import("./Message")>;
    editOriginal(content: import("../Types").StringResolvable, options?: import("../Types").InteractionMessageOptions): Promise<any>;
    followup(content: import("../Types").StringResolvable, options?: import("../Types").InteractionMessageOptions): Promise<any>;
    toJSON(): {
        type: number;
        id: string;
        application_id: string;
        channel_id: string | null;
        guild_id: string | null;
        member: {
            id: string;
            nick: string | null;
            mute: boolean;
            joined_at: string;
            premium_since: string | null;
            user: {
                username: string;
                discriminator: string;
                bot: boolean; /**
                 * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
                 */
                id: string;
                avatar: string | null;
                public_flags: number;
            };
            roles: string[];
            guild_id: string | undefined;
        } | null;
        user: {
            username: string;
            discriminator: string;
            bot: boolean; /**
             * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
             */
            id: string;
            avatar: string | null;
            public_flags: number;
        };
        token: string;
        version: number;
        data: {
            id: string;
            type: 1 | 2;
        } | {
            id: string;
            name: string;
            options: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption[];
            resolved: {
                users: {
                    username: string;
                    discriminator: string;
                    bot: boolean; /**
                     * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
                     */
                    id: string;
                    avatar: string | null;
                    public_flags: number;
                }[];
                members: {
                    id: string;
                    nick: string | null;
                    mute: boolean;
                    joined_at: string;
                    premium_since: string | null;
                    user: {
                        username: string;
                        discriminator: string;
                        bot: boolean; /**
                         * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
                         */
                        id: string;
                        avatar: string | null;
                        public_flags: number;
                    };
                    roles: string[];
                    guild_id: string | undefined;
                }[];
                roles: {
                    name: string;
                    id: string;
                    color: number;
                    managed: boolean;
                    hoist: boolean;
                    permissions: number;
                    position: number;
                    mentionable: boolean;
                    guild_id: string | undefined;
                }[];
                channels: {
                    id: string;
                    guild_id: string | null;
                    type: number;
                    name: string;
                    permissions: string;
                }[];
            };
        } | null;
        message: ({
            id: string;
            channel_id: string;
            guild_id: string | null;
            author: {
                username: string;
                discriminator: string;
                bot: boolean; /**
                 * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
                 */
                id: string;
                avatar: string | null;
                public_flags: number;
            };
            member: {
                id: string;
                nick: string | null;
                mute: boolean;
                joined_at: string;
                premium_since: string | null;
                user: {
                    username: string;
                    discriminator: string;
                    bot: boolean; /**
                     * Reply to an interaction. You may not return in your route handler until after the request has sent. Await the promise to resolve before returning.
                     */
                    id: string;
                    avatar: string | null;
                    public_flags: number;
                };
                roles: string[];
                guild_id: string | undefined;
            } | null;
            attachments: import("./Util/Collection")<string, import("./MessageAttachment")>;
            application: import("@amanda/discordtypings").ApplicationData | null;
            content: string;
            edited_timestamp: string | null;
            embeds: {
                title: string | null;
                type: string;
                description: string | null;
                url: string | null;
                timestamp: Date | null;
                color: number;
                fields: import("../Types").EmbedField[];
                thumbnail: import("../Types").MessageEmbedThumbnail | null;
                image: import("../Types").MessageEmbedImage | null;
                author: {
                    name: string;
                    url: string;
                    icon_url: string;
                } | null;
                footer: {
                    text: string;
                    icon_url: string;
                } | null;
            }[];
            flags: number;
            timestamp: string;
            mentions: (import("@amanda/discordtypings").UserData & {
                member?: import("@amanda/discordtypings").MemberData | undefined;
            })[];
            mention_roles: string[];
            mention_everyone: boolean;
            mention_channels: import("@amanda/discordtypings").ChannelMentionData[];
            nonce: string | null;
            pinned: boolean;
            tts: boolean;
            type: number;
            system: boolean;
            webhook_id: string | null;
            thread: import("@amanda/discordtypings").ThreadChannelData | null;
        } & {
            activity?: {
                party_id?: string | undefined;
                type?: number | undefined;
            } | undefined;
        }) | null;
    };
    _patch(data: import("@amanda/discordtypings").InteractionData): void;
}
export = InteractionMessage;
