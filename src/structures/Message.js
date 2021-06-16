"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const APIMessage_1 = __importDefault(require("./APIMessage"));
const Base_1 = __importDefault(require("./Base"));
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const ClientApplication_1 = __importDefault(require("./ClientApplication"));
const MessageAttachment_1 = __importDefault(require("./MessageAttachment"));
const MessageComponentInteractionCollector_1 = __importDefault(require("./MessageComponentInteractionCollector"));
const MessageEmbed_1 = __importDefault(require("./MessageEmbed"));
const MessageMentions_1 = __importDefault(require("./MessageMentions"));
const ReactionCollector_1 = __importDefault(require("./ReactionCollector"));
const Sticker_1 = __importDefault(require("./Sticker"));
const errors_1 = require("../errors");
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = require("../util/Constants");
const MessageFlags_1 = __importDefault(require("../util/MessageFlags"));
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
const Util_1 = __importDefault(require("../util/Util"));
class Message extends Base_1.default {
    constructor(client, data, channel) {
        super(client);
        this.partial = false;
        this.deleted = false;
        this.attachments = new Collection_1.default();
        this.stickers = new Collection_1.default();
        this.channel = channel;
        if (data)
            this._patch(data);
    }
    _patch(data) {
        var _a, _b;
        const User = require("./User");
        const MessageReaction = require("./MessageReaction");
        const GuildMember = require("./GuildMember");
        this.id = data.id;
        if ("type" in data) {
            this.type = Constants_1.MessageTypes[data.type];
            this.system = Constants_1.SystemMessageTypes.includes(this.type);
        }
        else if (typeof this.type !== "string") {
            this.system = null;
            this.type = null;
        }
        if ("content" in data) {
            this.content = data.content;
        }
        else if (typeof this.content !== "string") {
            this.content = null;
        }
        if ("author" in data) {
            this.author = data.author.id === this.client.user.id ? this.client.user : new User(this.client, data.author);
            if (data.author.id === this.client.user.id)
                this.client.user._patch(data.author);
        }
        else if (!this.author) {
            this.author = null;
        }
        if ("pinned" in data) {
            this.pinned = Boolean(data.pinned);
        }
        else if (typeof this.pinned !== "boolean") {
            this.pinned = null;
        }
        if ("tts" in data) {
            this.tts = data.tts;
        }
        else if (typeof this.tts !== "boolean") {
            this.tts = null;
        }
        this.nonce = "nonce" in data ? data.nonce : null;
        this.embeds = (data.embeds || []).map(e => new MessageEmbed_1.default(e, true));
        this.components = (_a = data.components, (_a !== null && _a !== void 0 ? _a : [])).map(c => BaseMessageComponent_1.default.create(c, this.client));
        if (data.attachments) {
            for (const attachment of data.attachments) {
                this.attachments.set(attachment.id, new MessageAttachment_1.default(attachment.url, attachment.filename, attachment));
            }
        }
        this.stickers = new Collection_1.default();
        if (data.stickers) {
            for (const sticker of data.stickers) {
                this.stickers.set(sticker.id, new Sticker_1.default(this.client, sticker));
            }
        }
        this.createdTimestamp = SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
        this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp).getTime() : null;
        if (data.reactions && data.reactions.length > 0) {
            for (const reaction of data.reactions) {
                const react = new MessageReaction(this, reaction.emoji, reaction.count, reaction.me);
                this.reactions.set(react.emoji.identifier, react);
            }
        }
        this.mentions = new MessageMentions_1.default(this, data.mentions, data.mention_roles, data.mention_everyone, data.mention_channels);
        this.webhookID = data.webhook_id || null;
        this.groupActivityApplication = data.application ? new ClientApplication_1.default(this.client, data.application) : null;
        this.applicationID = (_b = data.application_id, (_b !== null && _b !== void 0 ? _b : null));
        this.activity = data.activity
            ? {
                partyID: data.activity.party_id,
                type: data.activity.type
            }
            : null;
        if (this.member && data.member) {
            this.member._patch(data.member);
        }
        else if (data.member && this.guild && this.author) {
            this.member = new GuildMember(this.client, Object.assign({}, data.member, { user: this.author }));
        }
        this.flags = new MessageFlags_1.default(data.flags).freeze();
        this.reference = data.message_reference
            ? {
                channelID: data.message_reference.channel_id,
                guildID: data.message_reference.guild_id || null,
                messageID: data.message_reference.message_id || null
            }
            : null;
        if (data.interaction) {
            this.interaction = {
                id: data.interaction.id,
                type: Constants_1.InteractionTypes[data.interaction.type],
                commandName: data.interaction.name,
                user: this.author && data.interaction.user.id === this.author.id ? this.author : new User(this.client, data.interaction.user)
            };
        }
        else if (!this.interaction) {
            this.interaction = null;
        }
    }
    patch(data) {
        const clone = this._clone();
        if (data.edited_timestamp)
            this.editedTimestamp = new Date(data.edited_timestamp).getTime();
        if ("content" in data)
            this.content = data.content;
        if ("pinned" in data)
            this.pinned = data.pinned;
        if ("tts" in data)
            this.tts = data.tts;
        if ("embeds" in data)
            this.embeds = data.embeds.map(e => new MessageEmbed_1.default(e, true));
        else
            this.embeds = this.embeds.slice();
        if ("components" in data)
            this.components = data.components.map(c => BaseMessageComponent_1.default.create(c, this.client));
        else
            this.components = this.components.slice();
        if ("attachments" in data) {
            this.attachments = new Collection_1.default();
            for (const attachment of data.attachments) {
                this.attachments.set(attachment.id, new MessageAttachment_1.default(attachment.url, attachment.filename, attachment));
            }
        }
        else {
            this.attachments = new Collection_1.default(this.attachments.map(i => [i.id, i]));
        }
        this.mentions = new MessageMentions_1.default(this, "mentions" in data ? data.mentions : this.mentions.users.map(u => u.toJSON()), "mention_roles" in data ? data.mention_roles : this.mentions.roles.map(r => r.id), "mention_everyone" in data ? data.mention_everyone : this.mentions.everyone, "mention_channels" in data ? data.mention_channels : this.mentions.crosspostedChannels.map(i => i.toJSON()));
        this.flags = new MessageFlags_1.default("flags" in data ? data.flags : 0).freeze();
        return clone;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get editedAt() {
        return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
    }
    get guild() {
        // @ts-ignore
        return this.channel.guild;
    }
    get url() {
        return `https://discord.com/channels/${this.guild ? this.guild.id : "@me"}/${this.channel.id}/${this.id}`;
    }
    get cleanContent() {
        return this.content != null ? Util_1.default.cleanContent(this.content, this) : null;
    }
    createReactionCollector(filter, options = {}) {
        return new ReactionCollector_1.default(this, filter, options);
    }
    awaitReactions(filter, options = {}) {
        return new Promise((resolve, reject) => {
            const collector = this.createReactionCollector(filter, options);
            collector.once("end", (reactions, reason) => {
                if (options.errors && options.errors.includes(reason))
                    reject(reactions);
                else
                    resolve(reactions);
            });
        });
    }
    createMessageComponentInteractionCollector(filter, options = {}) {
        return new MessageComponentInteractionCollector_1.default(this, filter, options);
    }
    awaitMessageComponentInteraction(filter, time) {
        return new Promise((resolve, reject) => {
            const collector = this.createMessageComponentInteractionCollector(filter, { max: 1, time });
            collector.once("end", interactions => {
                const interaction = interactions.first();
                if (!interaction)
                    reject(new errors_1.Error("INTERACTION_COLLECTOR_TIMEOUT"));
                else
                    resolve(interaction);
            });
        });
    }
    get editable() {
        var _a;
        return ((_a = this.author) === null || _a === void 0 ? void 0 : _a.id) === this.client.user.id;
    }
    get deletable() {
        var _a;
        return !this.deleted && ((_a = this.author) === null || _a === void 0 ? void 0 : _a.id) === this.client.user.id;
    }
    get pinnable() {
        return this.type === "DEFAULT";
    }
    fetchReference() {
        var _a;
        const PartialChannel = require("./Partial/PartialChannel");
        if (!this.reference)
            throw new errors_1.Error("MESSAGE_REFERENCE_MISSING");
        const { channelID, messageID } = this.reference;
        const channel = new PartialChannel(this.client, { id: channelID, guild_id: (_a = this.guild) === null || _a === void 0 ? void 0 : _a.id });
        if (!channel)
            throw new errors_1.Error("GUILD_CHANNEL_RESOLVE");
        return channel.fetchMessage(messageID);
    }
    get crosspostable() {
        return this.channel.type === "news" && !this.flags.has(MessageFlags_1.default.FLAGS.CROSSPOSTED) && this.type === "DEFAULT" && (this.author && this.author.id === this.client.user.id);
    }
    async edit(options) {
        const opts = options instanceof APIMessage_1.default ? options : APIMessage_1.default.create(this, options);
        const { data, files } = opts.resolveData();
        const d = await this.client._snow.channel.editMessage(this.channel.id, this.id, Object.assign({}, data, { files: files }), { disableEveryone: options.disableEveryone ? options.disableEveryone : this.client.options.disableEveryone || false });
        return this._patch(d);
    }
    async crosspost() {
        const d = await this.client._snow.channel.crosspostMessage(this.channel.id, this.id);
        this._patch(d);
        return this;
    }
    async pin() {
        await this.client._snow.channel.addChannelPinnedMessage(this.channel.id, this.id);
        return this;
    }
    async unpin() {
        await this.client._snow.channel.removeChannelPinnedMessage(this.channel.id, this.id);
        return this;
    }
    async react(emoji) {
        const ReactionEmoji = require("./ReactionEmoji");
        const GuildEmoji = require("./GuildEmoji");
        if (typeof emoji === "string") {
            if (emoji.match(/^\d+$/))
                emoji = `_:${emoji}`;
        }
        else {
            if (!emoji.name && !emoji.id)
                throw new TypeError("MESSAGE_REACT_EMOJI_NOT_RESOLAVABLE");
            if (emoji instanceof ReactionEmoji || emoji instanceof GuildEmoji)
                emoji = emoji.identifier;
            else
                emoji = emoji.id === null ? emoji.name : `${emoji.name ? emoji.name : "_"}:${emoji.id}`;
        }
        const ceregex = /<?a?:?(\w+):(\d+)>?/;
        let value;
        const match = emoji.match(ceregex);
        if (match)
            value = `${match[1]}:${match[2]}`;
        else
            value = emoji;
        await this.client._snow.channel.createReaction(this.channel.id, this.id, encodeURIComponent(value));
        return this;
    }
    async clearReactions() {
        await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
        return this;
    }
    async delete() {
        await this.client._snow.channel.deleteMessage(this.channel.id, this.id);
        return this;
    }
    reply(options) {
        var _a, _b;
        let data;
        if (options instanceof APIMessage_1.default) {
            data = options;
        }
        else {
            data = APIMessage_1.default.create(this, options, {
                reply: {
                    messageReference: this,
                    failIfNotExists: (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.failIfNotExists, (_b !== null && _b !== void 0 ? _b : true))
                }
            });
        }
        return this.channel.send(data);
    }
    async fetch() {
        const d = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
        this._patch(d);
        return this;
    }
    fetchWebhook() {
        if (!this.webhookID)
            return Promise.reject(new errors_1.Error("WEBHOOK_MESSAGE"));
        return this.client.fetchWebhook(this.webhookID);
    }
    suppressEmbeds(suppress = true) {
        const flags = new MessageFlags_1.default(this.flags.bitfield);
        if (suppress) {
            flags.add(MessageFlags_1.default.FLAGS.SUPPRESS_EMBEDS);
        }
        else {
            flags.remove(MessageFlags_1.default.FLAGS.SUPPRESS_EMBEDS);
        }
        return this.edit({ flags });
    }
    removeAttachments() {
        return this.edit({ attachments: [] });
    }
    equals(message, rawData) {
        var _a;
        if (!message)
            return false;
        const embedUpdate = !message.author && !message.attachments;
        if (embedUpdate)
            return this.id === message.id && this.embeds.length === message.embeds.length;
        let equal = this.id === message.id &&
            !!this.author && this.author.id === ((_a = message.author) === null || _a === void 0 ? void 0 : _a.id) &&
            this.content === message.content &&
            this.tts === message.tts &&
            this.nonce === message.nonce &&
            this.embeds.length === message.embeds.length &&
            this.attachments.length === message.attachments.length;
        if (equal && rawData) {
            equal =
                this.mentions.everyone === message.mentions.everyone &&
                    this.createdTimestamp === new Date(rawData.timestamp).getTime() &&
                    this.editedTimestamp === new Date(rawData.edited_timestamp || "").getTime();
        }
        return equal;
    }
    toString() {
        return this.content;
    }
    toJSON() {
        // @ts-ignore
        return super.toJSON({
            channel: "channelID",
            author: "authorID",
            groupActivityApplication: "groupActivityApplicationID",
            guild: "guildID",
            cleanContent: true,
            member: false,
            reactions: false
        });
    }
}
module.exports = Message;
