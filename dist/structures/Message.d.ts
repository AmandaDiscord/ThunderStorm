import Collection from "./Util/Collection";
import Base from "./Base";
import ClientApplication from "./ClientApplication";
import GuildMember from "./GuildMember";
import MessageAttachment from "./MessageAttachment";
import MessageFlags from "./MessageFlags";
import MessageMentions from "./MessageMentions";
import MessageReaction from "./MessageReaction";
import ThreadTextChannel from "./ThreadTextChannel";
declare class Message extends Base {
    id: string;
    channel: import("./Partial/PartialChannel");
    guild: import("./Partial/PartialGuild") | null;
    author: import("./User");
    member: GuildMember | null;
    attachments: Collection<string, import("./MessageAttachment")>;
    application: ClientApplication | null;
    applicationID: string | null;
    activity: {
        partyID?: string;
        type?: number;
    } | null;
    content: string;
    editedAt: Date | null;
    editedTimestamp: number | null;
    embeds: Array<import("./MessageEmbed")>;
    flags: Readonly<MessageFlags>;
    mentions: MessageMentions;
    reactions: Collection<string, MessageReaction>;
    thread: ThreadTextChannel | null;
    nonce: string | null;
    pinned: boolean;
    tts: boolean;
    type: number;
    system: boolean;
    webhookID: string | null;
    buttons: Array<import("./ButtonRow")>;
    constructor(data: import("@amanda/discordtypings").MessageData, client: import("./Client"));
    get cleanContent(): string;
    reply(content: import("../Types").StringResolvable, options?: Exclude<import("../Types").MessageOptions, "suppress">): Promise<Message>;
    crosspost(): Promise<this>;
    edit(content: import("../Types").StringResolvable, options?: Exclude<import("../Types").MessageOptions, "nonce">): Promise<this>;
    /**
     * @param timeout timeout in ms to delete the Message.
     */
    delete(timeout?: number): Promise<this>;
    react(emoji: string): Promise<this>;
    clearReactions(): Promise<this>;
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
            joined_at: string;
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
        attachments: Collection<string, MessageAttachment>;
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
        application_id: string | null;
        components: {
            type: 1;
            components: import("@amanda/discordtypings").ButtonData[];
        }[];
    } & {
        activity?: {
            party_id?: string | undefined;
            type?: number | undefined;
        } | undefined;
    };
    toString(): string;
    _patch(data: import("@amanda/discordtypings").MessageData): void;
}
export = Message;
