import User from "./User";
import GuildMember from "./GuildMember";
declare class Message {
    client: import("./Client");
    id: string;
    channel: import("./Partial/PartialChannel");
    guild: import("./Partial/PartialGuild") | null;
    author: import("./User");
    member: GuildMember | null;
    attachments: Array<import("@amanda/discordtypings").AttachmentData>;
    content: string;
    editedAt: Date | null;
    editedTimestamp: number | null;
    embeds: Array<import("./MessageEmbed")>;
    flags: number;
    createdAt: Date;
    createdTimestamp: number;
    mentions: Array<GuildMember>;
    nonce: string;
    pinned: boolean;
    tts: boolean;
    type: number;
    system: boolean;
    webhookID: string | null;
    constructor(data: import("@amanda/discordtypings").MessageData, client: import("./Client"));
    toJSON(): {
        id: string;
        channel_id: string;
        guild_id: string | null;
        author: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
        };
        member: {
            id: string;
            nick: string | null;
            mute: boolean;
            joined_at: Date;
            premium_since: string | null;
            user: {
                username: string;
                discriminator: string;
                bot: boolean;
                id: string;
                avatar: string | null;
                public_flags: number;
            };
            roles: string[];
            guild_id: string | undefined;
        } | null;
        attachments: import("@amanda/discordtypings").AttachmentData[];
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
        mentions: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
            member: {
                id: string;
                nick: string | null;
                mute: boolean;
                joined_at: Date;
                premium_since: string | null;
                user: {
                    username: string;
                    discriminator: string;
                    bot: boolean;
                    id: string;
                    avatar: string | null;
                    public_flags: number;
                };
                roles: string[];
                guild_id: string | undefined;
            };
        }[];
        nonce: string;
        pinned: boolean;
        tts: boolean;
        type: number;
        system: boolean;
        webhook_id: string | null;
    };
    toString(): string;
    edit(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<Message>;
    delete(timeout?: number): Promise<this>;
    react(emoji: string): Promise<this>;
    deleteReaction(user: string | User | GuildMember | import("./Partial/PartialUser"), emoji: string): Promise<this>;
    clearReactions(): Promise<this>;
}
export = Message;
