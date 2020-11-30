"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CategoryChannel_1 = __importDefault(require("../CategoryChannel"));
const DMChannel_1 = __importDefault(require("../DMChannel"));
const Guild_1 = __importDefault(require("../Guild"));
const NewsChannel_1 = __importDefault(require("../NewsChannel"));
const TextChannel_1 = __importDefault(require("../TextChannel"));
const User_1 = __importDefault(require("../User"));
const VoiceChannel_1 = __importDefault(require("../VoiceChannel"));
const SnowflakeUtil_1 = __importDefault(require("../Util/SnowflakeUtil"));
class PartialBase {
    constructor(data, client) {
        this.client = client;
        this.partial = true;
        this.partialType = "Base";
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
            else
                data = channeldata;
        }
        else if (this.partialType === "Guild") {
            const guilddata = await this.client._snow.guild.getGuild(this.id);
            if (!guilddata)
                return null;
            data = new Guild_1.default(guilddata, this.client);
        }
        else if (this.partialType === "User") {
            const userdata = await this.client._snow.user.getUser(this.id);
            if (!userdata)
                return null;
            data = new User_1.default(userdata, this.client);
        }
        else if (this.partialType === "Role") {
            const Role = (await Promise.resolve().then(() => __importStar(require("../Role")))).default;
            if (!this.guild)
                return null;
            const rolesdata = await this.client._snow.guild.getGuildRoles(this.guild.id);
            if (!rolesdata)
                return null;
            const roledata = rolesdata.find(r => r.id === this.id);
            if (roledata)
                data = new Role(roledata, this.client);
        }
        return data;
    }
}
module.exports = PartialBase;
