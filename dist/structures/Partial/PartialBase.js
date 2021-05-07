"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CategoryChannel_1 = __importDefault(require("../CategoryChannel"));
const DMChannel_1 = __importDefault(require("../DMChannel"));
const Guild_1 = __importDefault(require("../Guild"));
const Message_1 = __importDefault(require("../Message"));
const NewsChannel_1 = __importDefault(require("../NewsChannel"));
const StageChannel_1 = __importDefault(require("../StageChannel"));
const TextChannel_1 = __importDefault(require("../TextChannel"));
const ThreadNewsChannel_1 = __importDefault(require("../ThreadNewsChannel"));
const ThreadTextChannel_1 = __importDefault(require("../ThreadTextChannel"));
const User_1 = __importDefault(require("../User"));
const VoiceChannel_1 = __importDefault(require("../VoiceChannel"));
const SnowflakeUtil_1 = __importDefault(require("../Util/SnowflakeUtil"));
class PartialBase {
    constructor(data, client) {
        this.partialType = "Base";
        this.client = client;
        this.partial = true;
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
            if (channeldata.type === 0)
                data = new TextChannel_1.default(channeldata, this.client);
            else if (channeldata.type === 1)
                data = new DMChannel_1.default(channeldata, this.client);
            else if (channeldata.type === 2)
                data = new VoiceChannel_1.default(channeldata, this.client);
            else if (channeldata.type === 4)
                data = new CategoryChannel_1.default(channeldata, this.client);
            else if (channeldata.type === 5)
                data = new NewsChannel_1.default(channeldata, this.client);
            else if (channeldata.type === 13)
                data = new StageChannel_1.default(channeldata, this.client);
            else
                data = channeldata;
        }
        else if (this.partialType === "Guild") {
            const guilddata = await this.client._snow.guild.getGuild(this.id);
            if (!guilddata)
                return null;
            data = new Guild_1.default(guilddata, this.client);
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
                data = new Role(roledata, this.client);
        }
        else if (this.partialType === "Thread") {
            if (!this.parent)
                return null;
            const threaddata = await this.client._snow.channel.getChannelActiveThreads(this.parent.id);
            if (!threaddata)
                return null;
            const current = threaddata.find(c => c.id === this.id);
            if (!current)
                return null;
            data = current.type === 10 ? new ThreadNewsChannel_1.default(current, this.client) : new ThreadTextChannel_1.default(current, this.client);
        }
        else if (this.partialType === "User") {
            const userdata = await this.client._snow.user.getUser(this.id);
            if (!userdata)
                return null;
            if (userdata.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(userdata);
            data = userdata.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(userdata, this.client);
        }
        else if (this.partialType === "Message") {
            if (!this.channel)
                return null;
            const messagedata = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
            if (!messagedata)
                return null;
            if (this.guild)
                messagedata.guild_id = this.guild.id;
            data = new Message_1.default(messagedata, this.client);
        }
        return data;
    }
}
module.exports = PartialBase;
