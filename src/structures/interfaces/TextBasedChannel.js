"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const MessageCollector_1 = __importDefault(require("../MessageCollector"));
const MessagePayload_1 = __importDefault(require("../MessagePayload"));
const SnowflakeUtil_1 = __importDefault(require("../../util/SnowflakeUtil"));
const collection_1 = require("@discordjs/collection");
const errors_1 = require("../../errors");
const MessageComponentInteractionCollector_1 = __importDefault(require("../MessageComponentInteractionCollector"));
class TextBasedChannel {
    constructor() {
        this.lastMessageId = null;
        this.lastPinTimestamp = null;
    }
    get lastMessage() {
        const PartialMessage = require("../Partial/PartialMessage");
        let message = null;
        if (this.lastMessageId) {
            message = new PartialMessage(this.client, { id: this.lastMessageId, channel_id: this.id });
            if (this.guild)
                message.guild = this.guild;
        }
        return message;
    }
    get lastPinAt() {
        return this.lastPinTimestamp ? new Date(this.lastPinTimestamp) : null;
    }
    async send(options) {
        const User = require("../User");
        const GuildMember = require("../GuildMember");
        const Message = require("../Message");
        if (this instanceof User || this instanceof GuildMember) {
            return this.createDM().then(dm => dm.send(options));
        }
        let messagePayload;
        if (options instanceof MessagePayload_1.default) {
            messagePayload = options.resolveData();
        }
        else {
            messagePayload = MessagePayload_1.default.create(this, options).resolveData();
        }
        if (Array.isArray(messagePayload.data.content)) {
            // @ts-ignore
            return Promise.all(messagePayload.split().map(this.send.bind(this)));
        }
        const { data, files } = await messagePayload.resolveFiles();
        const d = await this.client._snow.channel.createMessage(this.id, Object.assign({}, data, { files: files }));
        const message = new Message(this.client, d, this);
        this.lastMessageId = message.id;
        return message;
    }
    startTyping() {
        return this.sendTyping();
    }
    sendTyping() {
        return this.client._snow.channel.startChannelTyping(this.id);
    }
    stopTyping() {
        void 0;
    }
    get typing() {
        return false;
    }
    get typingCount() {
        return 0;
    }
    createMessageCollector(filter, options = {}) {
        return new MessageCollector_1.default(this, filter, options);
    }
    awaitMessages(filter, options = {}) {
        return new Promise((resolve, reject) => {
            const collector = this.createMessageCollector(filter, options);
            collector.once("end", (collection, reason) => {
                if (options.errors && options.errors.includes(reason)) {
                    reject(collection);
                }
                else {
                    resolve(collection);
                }
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
    async bulkDelete(messages, filterOld = false) {
        const PartialMessage = require("../Partial/PartialMessage");
        if (Array.isArray(messages) || messages instanceof collection_1.Collection) {
            let messageIds = messages instanceof collection_1.Collection ? Array.from(messages.keys()) : messages.map(m => typeof m === "string" ? m : m.id);
            if (filterOld) {
                messageIds = messageIds.filter(id => Date.now() - SnowflakeUtil_1.default.deconstruct(id).timestamp < 1209600000);
            }
            if (messageIds.length === 0)
                return new collection_1.Collection();
            if (messageIds.length === 1) {
                await this.client._snow.channel.deleteMessage(this.id, messageIds[0]);
                return new collection_1.Collection([[messageIds[0], new PartialMessage(this.client, { id: messageIds[0], channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })]]);
            }
            await this.client._snow.channel.bulkDeleteMessages(this.id, messageIds);
            const collection = new collection_1.Collection();
            return messageIds.reduce((col, id) => col.set(id, new PartialMessage(this.client, { id: id, channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })), collection);
        }
        if (!isNaN(messages)) {
            const msgs = await this.client._snow.channel.getChannelMessages(this.id, { limit: messages });
            return this.bulkDelete(msgs.map(i => i.id), filterOld);
        }
        throw new errors_1.TypeError("MESSAGE_BULK_DELETE_TYPE");
    }
    async fetchMessage(message) {
        const Message = require("../Message");
        let messageId;
        if (typeof message === "string")
            messageId = message;
        else
            messageId = message.id;
        const msg = await this.client._snow.channel.getChannelMessage(this.id, messageId);
        return new Message(this.client, msg, this);
    }
    async fetchMessages(options) {
        const Message = require("../Message");
        const messages = await this.client._snow.channel.getChannelMessages(this.id, options);
        return new collection_1.Collection(messages.map(m => [m.id, new Message(this.client, m, this)]));
    }
    static applyToClass(structure, full = false, ignore = []) {
        const props = ["send"];
        if (full) {
            props.push("lastMessage", "lastPinAt", "bulkDelete", "startTyping", "sendTyping", "stopTyping", "typing", "typingCount", "createMessageCollector", "awaitMessages", "createMessageComponentInteractionCollector", "awaitMessageComponentInteraction", "fetchMessage", "fetchMessages");
        }
        for (const prop of props) {
            if (ignore.includes(prop))
                continue;
            Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(TextBasedChannel.prototype, prop));
        }
    }
}
TextBasedChannel.default = TextBasedChannel;
module.exports = TextBasedChannel;
