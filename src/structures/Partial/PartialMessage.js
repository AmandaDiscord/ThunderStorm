"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PartialBase_1 = __importDefault(require("./PartialBase"));
const APIMessage_1 = __importDefault(require("../APIMessage"));
const Message_1 = __importDefault(require("../Message"));
const MessageComponentInteractionCollector_1 = __importDefault(require("../MessageComponentInteractionCollector"));
const ReactionCollector_1 = __importDefault(require("../ReactionCollector"));
const MessageFlags_1 = __importDefault(require("../../util/MessageFlags"));
class PartialMessage extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.partialType = "Message";
        const PartialChannel = require("./PartialChannel");
        this.channel = new PartialChannel(client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" });
        this.guild = this.channel.guild || null;
    }
    get url() {
        return `https://discord.com/channels/${this.guild ? this.guild.id : "@me"}/${this.channel.id}/${this.id}`;
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
    async crosspost() {
        const data = await this.client._snow.channel.crosspostMessage(this.channel.id, this.id);
        return new Message_1.default(this.client, data, this.channel);
    }
    async edit(options = {}) {
        const opts = options instanceof APIMessage_1.default ? options : APIMessage_1.default.create(this, options);
        const { data, files } = opts.resolveData();
        const d = await this.client._snow.channel.editMessage(this.channel.id, this.id, Object.assign({}, data, { files: files }), { disableEveryone: options.disableEveryone ? options.disableEveryone : this.client.options.disableEveryone || false });
        return new Message_1.default(this.client, d, this.channel);
    }
    async delete() {
        await this.client._snow.channel.deleteMessage(this.channel.id, this.id);
        return this;
    }
    async react(emoji) {
        const ReactionEmoji = require("../ReactionEmoji");
        const GuildEmoji = require("../GuildEmoji");
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
    async pin() {
        await this.client._snow.channel.addChannelPinnedMessage(this.channel.id, this.id);
        return this;
    }
    async unpin() {
        await this.client._snow.channel.removeChannelPinnedMessage(this.channel.id, this.id);
        return this;
    }
    suppressEmbeds(suppress = true) {
        const flags = new MessageFlags_1.default(0);
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
                    reject(new Error("INTERACTION_COLLECTOR_TIMEOUT"));
                else
                    resolve(interaction);
            });
        });
    }
    toJSON() {
        const value = { channel_id: this.channel.id };
        if (this.guild)
            value["guild_id"] = this.guild.id;
        return Object.assign(super.toJSON(), value);
    }
}
module.exports = PartialMessage;
