"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const Base_1 = __importDefault(require("./Base"));
const UserFlags_1 = __importDefault(require("../util/UserFlags"));
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
// @ts-ignore
class User extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.lastMessageId = null;
        this.lastMessage = null;
        this.partial = false;
        this.dmChannel = null;
        this.presence = null;
        this.lastMessageChannelId = null;
        if (data.username)
            this.username = data.username;
        if (data.discriminator)
            this.discriminator = data.discriminator;
        if (!this.bot || data.bot !== undefined)
            this.bot = data.bot || false;
        if (data.id)
            this.id = data.id;
        if (!this.avatar)
            this.avatar = data.avatar || null;
        if (!this.flags || data.public_flags)
            this.flags = new UserFlags_1.default(data.public_flags || 0).freeze();
        if (!this.system || data.system !== undefined)
            this.system = data.system || false;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    get defaultAvatarURL() {
        return this.client.rest.cdn.DefaultAvatar(Number(this.discriminator) % 5);
    }
    toString() {
        return `<@${this.id}>`;
    }
    toJSON() {
        return {
            username: this.username,
            discriminator: this.discriminator,
            bot: this.bot,
            id: this.id,
            avatar: this.avatar,
            public_flags: Number(this.flags.bitfield)
        };
    }
    avatarURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.avatar)
            return null;
        return this.client.rest.cdn.Avatar(this.id, this.avatar, options.format, options.size, options.dynamic);
    }
    async createDM() {
        const DMChannel = require("./DMChannel");
        const d = await this.client._snow.user.createDirectMessageChannel(this.id);
        const channel = new DMChannel(this.client, d);
        this.dmChannel = channel;
        return channel;
    }
    async deleteDM() {
        const { dmChannel } = this;
        if (!dmChannel)
            throw new Error("USER_NO_DMCHANNEL");
        const data = await this.client.api.channels(dmChannel.id).delete();
        this.client.actions.ChannelDelete.handle(data);
        return dmChannel;
    }
    displayAvatarURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.avatar)
            return this.defaultAvatarURL;
        else
            return this.avatarURL(options);
    }
    equals(user) {
        return user &&
            this.id === user.id &&
            this.username === user.username &&
            this.discriminator === user.discriminator &&
            this.avatar === user.avatar;
    }
    async fetchFlags(force = false) {
        if (this.flags && !force)
            return this.flags;
        const data = await this.client._snow.user.getUser(this.id);
        this._patch(data);
        return this.flags;
    }
    fetch() {
        return Promise.resolve(this);
    }
    _patch(data) {
        if (data.username)
            this.username = data.username;
        if (data.discriminator)
            this.discriminator = data.discriminator;
        if (!this.bot || data.bot !== undefined)
            this.bot = data.bot || false;
        if (data.id)
            this.id = data.id;
        if (!this.avatar || data.avatar !== undefined)
            this.avatar = data.avatar || null;
        if (!this.flags || data.public_flags)
            this.flags = new UserFlags_1.default(data.public_flags || 0).freeze();
        if (!this.system || data.system !== undefined)
            this.system = data.system || false;
    }
}
User.default = User;
TextBasedChannel_1.default.applyToClass(User);
module.exports = User;
