"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collector_1 = __importDefault(require("./interfaces/Collector"));
const Constants_1 = require("../util/Constants");
class MessageCollector extends Collector_1.default {
    constructor(channel, filter, options = {}) {
        super(channel.client, filter, options);
        this.channel = channel;
        this.received = 0;
        const bulkDeleteListener = (messages) => {
            for (const message of messages.values())
                this.handleDispose(message);
        };
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
        this.client.incrementMaxListeners();
        this.client.on(Constants_1.Events.MESSAGE_CREATE, this.handleCollect);
        this.client.on(Constants_1.Events.MESSAGE_DELETE, this.handleDispose);
        this.client.on(Constants_1.Events.MESSAGE_BULK_DELETE, bulkDeleteListener);
        this.client.on(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
        this.client.on(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
        this.once("end", () => {
            this.client.removeListener(Constants_1.Events.MESSAGE_CREATE, this.handleCollect);
            this.client.removeListener(Constants_1.Events.MESSAGE_DELETE, this.handleDispose);
            this.client.removeListener(Constants_1.Events.MESSAGE_BULK_DELETE, bulkDeleteListener);
            this.client.removeListener(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
            this.client.removeListener(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
            this.client.decrementMaxListeners();
        });
    }
    collect(message) {
        if (message.channel.id !== this.channel.id)
            return null;
        this.received++;
        return message.id;
    }
    dispose(message) {
        return message.channel.id === this.channel.id ? message.id : null;
    }
    get endReason() {
        if (this.options.max && this.collected.size >= this.options.max)
            return "limit";
        if (this.options.maxProcessed && this.received === this.options.maxProcessed)
            return "processedLimit";
        return null;
    }
    _handleChannelDeletion(channel) {
        if (channel.id === this.channel.id)
            this.stop("channelDelete");
    }
    _handleGuildDeletion(guild) {
        // @ts-ignore
        if (this.channel.guild && guild.id === this.channel.guild.id)
            this.stop("guildDelete");
    }
}
module.exports = MessageCollector;
