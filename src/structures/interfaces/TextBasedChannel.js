"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const MessageCollector_1 = __importDefault(require("../MessageCollector"));
const APIMessage_1 = __importDefault(require("../APIMessage"));
const SnowflakeUtil_1 = __importDefault(require("../../util/SnowflakeUtil"));
const Collection_1 = __importDefault(require("../../util/Collection"));
const errors_1 = require("../../errors");
const MessageComponentInteractionCollector_1 = __importDefault(require("../MessageComponentInteractionCollector"));
class TextBasedChannel {
    constructor() {
        this.lastMessageID = null;
        this.lastPinTimestamp = null;
        void 0;
    }
    get lastMessage() {
        const PartialMessage = require("../Partial/PartialMessage");
        let message = null;
        if (this.lastMessageID) {
            message = new PartialMessage(this.client, { id: this.lastMessageID, channel_id: this.id });
            // @ts-ignore
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
        let apiMessage;
        if (options instanceof APIMessage_1.default) {
            apiMessage = options.resolveData();
        }
        else {
            apiMessage = APIMessage_1.default.create(this, options).resolveData();
        }
        if (Array.isArray(apiMessage.data.content)) {
            // @ts-ignore
            return Promise.all(apiMessage.split().map(this.send.bind(this)));
        }
        const { data, files } = await apiMessage.resolveFiles();
        const d = await this.client._snow.channel.createMessage(this.id, Object.assign({}, data, { files: files }));
        const message = new Message(this.client, d, this);
        this.lastMessageID = message.id;
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
        if (Array.isArray(messages) || messages instanceof Collection_1.default) {
            // @ts-ignore
            let messageIDs = messages instanceof Collection_1.default ? messages.keyArray() : messages.map(m => m.id || m);
            if (filterOld) {
                messageIDs = messageIDs.filter(id => Date.now() - SnowflakeUtil_1.default.deconstruct(id).timestamp < 1209600000);
            }
            if (messageIDs.length === 0)
                return new Collection_1.default();
            if (messageIDs.length === 1) {
                await this.client._snow.channel.deleteMessage(this.id, messageIDs[0]);
                // @ts-ignore
                return new Collection_1.default([[messageIDs[0], new PartialMessage(this.client, { id: messageIDs[0], channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })]]);
            }
            await this.client._snow.channel.bulkDeleteMessages(this.id, messageIDs);
            const collection = new Collection_1.default();
            return messageIDs.reduce((col, id) => col.set(id, 
            // @ts-ignore
            new PartialMessage(this.client, { id: id, channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })), collection);
        }
        if (!isNaN(messages)) {
            const msgs = await this.client._snow.channel.getChannelMessages(this.id, { limit: messages });
            return this.bulkDelete(msgs.map(i => i.id), filterOld);
        }
        throw new errors_1.TypeError("MESSAGE_BULK_DELETE_TYPE");
    }
    async fetchMessage(message) {
        const Message = require("../Message");
        let messageID;
        if (typeof message === "string")
            messageID = message;
        else
            messageID = message.id;
        const msg = await this.client._snow.channel.getChannelMessage(this.id, messageID);
        return new Message(this.client, msg, this);
    }
    async fetchMessages(options) {
        const Message = require("../Message");
        const messages = await this.client._snow.channel.getChannelMessages(this.id, options);
        return new Collection_1.default(messages.map(m => [m.id, new Message(this.client, m, this)]));
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
module.exports = TextBasedChannel;
