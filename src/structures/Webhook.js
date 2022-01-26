"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
const MessagePayload_1 = __importDefault(require("./MessagePayload"));
const Channel_1 = __importDefault(require("./Channel"));
const Constants_1 = require("../util/Constants");
const DataResolver_1 = __importDefault(require("../util/DataResolver"));
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class Webhook {
    constructor(client, data) {
        this.name = null;
        this.token = null;
        this.avatar = null;
        this.owner = null;
        this.sourceGuild = null;
        this.sourceChannel = null;
        this.client = client;
        if (data)
            this._patch(data);
    }
    _patch(data) {
        const Guild = require("./Guild");
        const NewsChannel = require("./NewsChannel");
        const User = require("./User");
        const PartialGuild = require("./Partial/PartialGuild");
        if (data.name !== undefined)
            this.name = data.name;
        if (data.token !== undefined)
            this.token = data.token || null;
        if (data.avatar !== undefined)
            this.avatar = data.avatar;
        if (data.id !== undefined)
            this.id = data.id;
        if (data.type !== undefined)
            this.type = Constants_1.WebhookTypes[data.type];
        if (data.guild_id !== undefined)
            this.guildId = data.guild_id;
        if (data.channel_id !== undefined)
            this.channelId = data.channel_id;
        if (data.user !== undefined)
            this.owner = data.user ? new User(this.client, data.user) : null;
        if (data.source_guild !== undefined)
            this.sourceGuild = data.source_guild ? new Guild(this.client, data.source_guild) : null;
        if (data.source_channel !== undefined && ((data.source_guild !== undefined && !!data.source_guild.id) || data.guild_id !== undefined)) {
            const g = new PartialGuild(this.client, { id: data.guild_id || data.source_guild.id });
            this.sourceChannel = data.source_channel ? new NewsChannel(g, data.source_channel) : null;
        }
    }
    async send(options) {
        let messagePayload;
        const Message = require("./Message");
        const PartialChannel = require("./Partial/PartialChannel");
        const InteractionWebhook = require("./InteractionWebhook");
        if (options instanceof MessagePayload_1.default) {
            messagePayload = options.resolveData();
        }
        else {
            messagePayload = MessagePayload_1.default.create(this, options).resolveData();
        }
        const { data, files } = await messagePayload.resolveFiles();
        let wait = true;
        if (this instanceof InteractionWebhook)
            wait = false;
        // @ts-ignore Wait is mean
        return this.client._snow.webhook.executeWebhook(this.id, this.token, Object.assign({}, data || {}, { files }), { wait }).then((d) => {
            const channel = new PartialChannel(this.client, { id: d.channel_id, guild_id: d.guild_id, type: Constants_1.ChannelTypes[0] });
            return new Message(this.client, d, channel);
        });
    }
    /**
     * Sends a raw slack message with this webhook.
     * @param body The raw body to send
     * @example
     * // Send a slack message
     * webhook.sendSlackMessage({
     * 	"username": "Wumpus",
     * 	"attachments": [{
     * 		"pretext": "this looks pretty cool",
     * 		"color": "#F0F",
     * 		"footer_icon": "http://snek.s3.amazonaws.com/topSnek.png",
     * 		"footer": "Powered by sneks",
     * 		"ts": Date.now() / 1000
     * 	}]
     * }).catch(console.error);
     */
    async sendSlackMessage(body) {
        try {
            await this.client._snow.webhook.executeWebhookSlack(this.id, this.token, body, { wait: true });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async edit(options = { name: this.name }) {
        let avatar;
        let channel;
        if (options.avatar && typeof options.avatar === "string" && !options.avatar.startsWith("data:")) {
            avatar = await DataResolver_1.default.resolveImage(options.avatar);
        }
        if (options.channel)
            channel = options.channel instanceof Channel_1.default ? options.channel.id : options.channel;
        const data = await this.client._snow.webhook.updateWebhook(this.id, channel ? undefined : this.token, { name: options.name, avatar: avatar, channel_id: channel });
        this.name = data.name;
        this.avatar = data.avatar;
        if (data.channel_id)
            this.channelId = data.channel_id;
        return this;
    }
    async fetchMessage(message) {
        const Message = require("./Message");
        const PartialChannel = require("./Partial/PartialChannel");
        const data = await this.client._snow.webhook.getWebhookMessage(this.id, this.token, message);
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: Constants_1.ChannelTypes[0] });
        return new Message(this.client, data, channel);
    }
    async editMessage(message, options) {
        if (!this.token)
            throw new Error("WEBHOOK_TOKEN_UNAVAILABLE");
        const Message = require("./Message");
        const PartialChannel = require("./Partial/PartialChannel");
        let messagePayload;
        if (options instanceof MessagePayload_1.default)
            messagePayload = options;
        else
            messagePayload = MessagePayload_1.default.create(this, options);
        const { data, files } = await messagePayload.resolveData().resolveFiles();
        const d = await this.client._snow.webhook.editWebhookMessage(this.id, this.token, typeof message === "string" ? message : message.id, Object.assign({}, data, { files }));
        const channel = new PartialChannel(this.client, { id: d.channel_id, guild_id: d.guild_id, type: Constants_1.ChannelTypes[0] });
        return new Message(this.client, d, channel);
    }
    delete() {
        return this.client._snow.webhook.deleteWebhook(this.id, this.token);
    }
    deleteMessage(message) {
        return this.client._snow.webhook.deleteWebhookMessage(this.id, this.token, typeof message === "string" ? message : message.id);
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get url() {
        return Endpoints_1.default.WEBHOOK_TOKEN(this.id, this.token);
    }
    avatarURL({ format, size } = {}) {
        if (!this.avatar)
            return null;
        return this.client.rest.cdn.Avatar(this.id, this.avatar, format, size);
    }
    static applyToClass(structure, ignore = []) {
        for (const prop of [
            "send",
            "sendSlackMessage",
            "fetchMessage",
            "edit",
            "editMessage",
            "delete",
            "deleteMessage",
            "createdTimestamp",
            "createdAt",
            "url"
        ]) {
            if (ignore.includes(prop))
                continue;
            Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(Webhook.prototype, prop));
        }
    }
}
Webhook.default = Webhook;
module.exports = Webhook;
