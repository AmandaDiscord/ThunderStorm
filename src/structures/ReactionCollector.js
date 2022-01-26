"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Collector_1 = __importDefault(require("./interfaces/Collector"));
const collection_1 = require("@discordjs/collection");
const Constants_1 = require("../util/Constants");
// @ts-ignore
class ReactionCollector extends Collector_1.default {
    constructor(message, filter, options = {}) {
        super(message.client, filter, options);
        this.users = new collection_1.Collection();
        this.total = 0;
        this.message = message;
        this.empty = this.empty.bind(this);
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
        this._handleMessageDeletion = this._handleMessageDeletion.bind(this);
        this.client.incrementMaxListeners();
        this.client.on(Constants_1.Events.MESSAGE_REACTION_ADD, this.handleCollect);
        this.client.on(Constants_1.Events.MESSAGE_REACTION_REMOVE, this.handleDispose);
        this.client.on(Constants_1.Events.MESSAGE_REACTION_REMOVE_ALL, this.empty);
        this.client.on(Constants_1.Events.MESSAGE_DELETE, this._handleMessageDeletion);
        this.client.on(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
        this.client.on(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
        this.once("end", () => {
            this.client.removeListener(Constants_1.Events.MESSAGE_REACTION_ADD, this.handleCollect);
            this.client.removeListener(Constants_1.Events.MESSAGE_REACTION_REMOVE, this.handleDispose);
            this.client.removeListener(Constants_1.Events.MESSAGE_REACTION_REMOVE_ALL, this.empty);
            this.client.removeListener(Constants_1.Events.MESSAGE_DELETE, this._handleMessageDeletion);
            this.client.removeListener(Constants_1.Events.CHANNEL_DELETE, this._handleChannelDeletion);
            this.client.removeListener(Constants_1.Events.GUILD_DELETE, this._handleGuildDeletion);
            this.client.decrementMaxListeners();
        });
        this.on("collect", (reaction, user) => {
            this.total++;
            this.users.set(user.id, user);
        });
        this.on("remove", (reaction, user) => {
            this.total--;
            if (!this.collected.some(r => r.users.has(user.id)))
                this.users.delete(user.id);
        });
    }
    collect(reaction, user) {
        if (reaction.message.id !== this.message.id)
            return null;
        // @ts-ignore
        if (reaction.count === 1 && this.filter(reaction, user, this.collected)) {
            this.emit("create", reaction, user);
        }
        return ReactionCollector.key(reaction);
    }
    dispose(reaction, user) {
        if (reaction.message.id !== this.message.id)
            return null;
        if (this.collected.has(ReactionCollector.key(reaction)) && this.users.has(user.id)) {
            this.emit("remove", reaction, user);
        }
        return reaction.count ? null : ReactionCollector.key(reaction);
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
        if (this.options.maxEmojis && this.collected.size >= this.options.maxEmojis)
            return "emojiLimit";
        if (this.options.maxUsers && this.users.size >= this.options.maxUsers)
            return "userLimit";
        return null;
    }
    _handleMessageDeletion(message) {
        if (message.id === this.message.id) {
            this.stop("messageDelete");
        }
    }
    _handleChannelDeletion(channel) {
        if (channel.id === this.message.channel.id) {
            this.stop("channelDelete");
        }
    }
    _handleGuildDeletion(guild) {
        if (this.message.guild && guild.id === this.message.guild.id) {
            this.stop("guildDelete");
        }
    }
    static key(reaction) {
        return reaction.emoji.id || reaction.emoji.name;
    }
}
ReactionCollector.default = ReactionCollector;
module.exports = ReactionCollector;
