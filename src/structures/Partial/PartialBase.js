"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Guild_1 = __importDefault(require("../Guild"));
const Message_1 = __importDefault(require("../Message"));
const ThreadNewsChannel_1 = __importDefault(require("../ThreadNewsChannel"));
const ThreadTextChannel_1 = __importDefault(require("../ThreadTextChannel"));
const User_1 = __importDefault(require("../User"));
const SnowflakeUtil_1 = __importDefault(require("../../util/SnowflakeUtil"));
const Util_1 = __importDefault(require("../../util/Util"));
class PartialBase {
    constructor(client, data) {
        this.partial = true;
        this.partialType = "Base";
        this.client = client;
        this.id = data.id;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    toJSON() {
        return {
            id: this.id
        };
    }
    async fetch() {
        var _a, _b;
        let data = null;
        if (this.partialType === "Channel") {
            const channeldata = await this.client._snow.channel.getChannel(this.id);
            data = Util_1.default.createChannelFromData(this.client, channeldata);
        }
        else if (this.partialType === "Guild") {
            const guilddata = await this.client._snow.guild.getGuild(this.id);
            if (!guilddata)
                return null;
            data = new Guild_1.default(this.client, guilddata);
        }
        else if (this.partialType === "Role") {
            const Role = require("../Role");
            if (!this.guild)
                return null;
            const rolesdata = await this.client._snow.guild.getGuildRoles(this.guild.id);
            if (!rolesdata)
                return null;
            const roledata = rolesdata.find(r => r.id === this.id);
            if (roledata)
                data = new Role(this.client, roledata);
        }
        else if (this.partialType === "Thread") {
            const threaddata = await this.client._snow.channel.getChannel(this.id);
            if (!threaddata)
                return null;
            data = threaddata.type === 10 && this.guild ? new ThreadNewsChannel_1.default(this.guild, threaddata) : (this.guild ? new ThreadTextChannel_1.default(this.guild, threaddata) : null);
        }
        else if (this.partialType === "User") {
            const userdata = await this.client._snow.user.getUser(this.id);
            if (!userdata)
                return null;
            if (userdata.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(userdata);
            data = userdata.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(this.client, userdata);
        }
        else if (this.partialType === "Message") {
            if (!this.channel)
                return null;
            const messagedata = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
            if (!messagedata)
                return null;
            if (this.guild)
                messagedata.guild_id = this.guild.id;
            data = new Message_1.default(this.client, messagedata, this.channel);
        }
        return data;
    }
}
PartialBase.default = PartialBase;
module.exports = PartialBase;
