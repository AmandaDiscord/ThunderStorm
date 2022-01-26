"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class ReactionEmoji {
    constructor(reaction, emoji) {
        this.client = reaction.message.client;
        this.reaction = reaction;
        this.name = emoji.name;
        this.id = emoji.id;
        this.animated = emoji.animated || false;
    }
    get createdTimestamp() {
        if (!this.id)
            return null;
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        if (!this.id)
            return null;
        return new Date(this.createdTimestamp);
    }
    get url() {
        if (!this.id)
            return null;
        return this.client.rest.cdn.Emoji(this.id, this.animated ? "gif" : "png");
    }
    get identifier() {
        if (this.id)
            return `${this.name}:${this.id}`;
        return encodeURIComponent(this.name);
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            animated: this.animated
        };
    }
    toString() {
        if (!this.id)
            return this.name;
        return `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`;
    }
}
ReactionEmoji.default = ReactionEmoji;
module.exports = ReactionEmoji;
