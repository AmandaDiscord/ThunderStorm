"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("../util/Collection"));
const ReactionEmoji_1 = __importDefault(require("./ReactionEmoji"));
class MessageReaction {
    constructor(message, emoji, count, me) {
        this.count = 0;
        this.users = new Collection_1.default();
        this.message = message;
        this.me = me;
        this.count = count || 0;
        this.emoji = new ReactionEmoji_1.default(this, emoji);
    }
    async remove(user = this.message.client.user) {
        var _a;
        const Message = require("./Message");
        const Guild = require("./Guild");
        let userID;
        if (typeof user === "string")
            userID = user;
        else if (user instanceof Message)
            userID = user.author.id;
        else if (user instanceof Guild)
            userID = user.ownerID;
        else
            userID = user.id;
        if (!userID)
            return Promise.reject(new Error("Couldn't resolve the user ID to remove from the reaction."));
        await this.message.client._snow.channel.deleteReaction(this.message.channel.id, this.message.id, this.emoji.identifier, userID);
        if (this.message instanceof Message)
            (_a = this.message.reactions.get(this.emoji.id || this.emoji.name)) === null || _a === void 0 ? void 0 : _a.users.delete(userID);
        return this;
    }
    async removeAll() {
        const Message = require("./Message");
        await this.message.client._snow.channel.deleteReaction(this.message.channel.id, this.message.id, this.emoji.identifier);
        if (this.message instanceof Message)
            this.message.reactions.delete(this.emoji.id || this.emoji.name);
        this.count = 0;
        this.me = false;
        return this;
    }
    async fetchUsers() {
        var _a, _b;
        const message = this.message;
        const User = require("./User");
        const data = await this.message.client._snow.channel.getReactions(message.channel.id, message.id, this.emoji.identifier);
        const users = new Collection_1.default();
        for (const rawUser of data) {
            if (rawUser.id === ((_a = message.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                message.client.user._patch(rawUser);
                this.me = true;
            }
            const user = rawUser.id === ((_b = message.client.user) === null || _b === void 0 ? void 0 : _b.id) ? message.client.user : new User(message.client, rawUser);
            this.users.set(user.id, user);
            users.set(user.id, user);
        }
        return users;
    }
}
module.exports = MessageReaction;
