"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Collector_1 = __importDefault(require("./interfaces/Collector"));
const collection_1 = require("@discordjs/collection");
const Constants_1 = require("../util/Constants");
// @ts-ignore
class MessageComponentInteractionCollector extends Collector_1.default {
    constructor(source, filter, options = {}) {
        super(source.client, filter, options);
        this.users = new collection_1.Collection();
        this.total = 0;
        const Message = require("./Message");
        const PartialMessage = require("./Partial/PartialMessage");
        this.message = (source instanceof Message || source instanceof PartialMessage) ? source : null;
        this.channel = (source instanceof Message || source instanceof PartialMessage) ? this.message.channel : source;
        this.empty = this.empty.bind(this);
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
        this._handleMessageDeletion = this._handleMessageDeletion.bind(this);
        this.client.incrementMaxListeners();
        this.client.on(Constants_1.Events.INTERACTION_CREATE, this.handleCollect);
        if (this.message)
            this.client.on(Constants_1.Events.MESSAGE_DELETE, this._handleMessageDeletion);
        this.client.on(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
        this.client.on(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
        this.once("end", () => {
            this.client.removeListener(Constants_1.Events.INTERACTION_CREATE, this.handleCollect);
            if (this.message)
                this.client.removeListener(Constants_1.Events.MESSAGE_DELETE, this._handleMessageDeletion);
            this.client.removeListener(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
            this.client.removeListener(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
            this.client.decrementMaxListeners();
        });
        this.on("collect", interaction => {
            this.total++;
            this.users.set(interaction.user.id, interaction.user);
        });
    }
    collect(interaction) {
        var _a, _b, _c;
        if (!interaction.isMessageComponent())
            return null;
        if (this.message) {
            return ((_a = interaction.message) === null || _a === void 0 ? void 0 : _a.id) === this.message.id ? interaction.id : null;
        }
        return ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.id) === ((_c = this.channel) === null || _c === void 0 ? void 0 : _c.id) ? interaction.id : null;
    }
    dispose(interaction) {
        var _a, _b;
        if (!interaction.isMessageComponent())
            return null;
        if (this.message) {
            return ((_a = interaction.message) === null || _a === void 0 ? void 0 : _a.id) === this.message.id ? interaction.id : null;
        }
        return ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.id) === this.channel.id ? interaction.id : null;
    }
    empty() {
        this.total = 0;
        this.collected.clear();
        this.users.clear();
        this.checkEnd();
    }
    get endReason() {
        if (this.options.max && this.total >= this.options.max)
            return "limit";
        if (this.options.maxComponents && this.collected.size >= this.options.maxComponents)
            return "componentLimit";
        if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
            return "userLimit";
        return null;
    }
    _handleMessageDeletion(message) {
        var _a;
        if (message.id === ((_a = this.message) === null || _a === void 0 ? void 0 : _a.id)) {
            this.stop("messageDelete");
        }
    }
    _handleChannelDeletion(channel) {
        if (channel.id === this.channel.id) {
            this.stop("channelDelete");
        }
    }
    _handleGuildDeletion(guild) {
        var _a;
        if (guild.id === ((_a = this.channel.guild) === null || _a === void 0 ? void 0 : _a.id)) {
            this.stop("guildDelete");
        }
    }
}
MessageComponentInteractionCollector.default = MessageComponentInteractionCollector;
module.exports = MessageComponentInteractionCollector;
