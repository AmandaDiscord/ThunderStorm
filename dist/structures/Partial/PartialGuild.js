"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const PartialBase_1 = __importDefault(require("./PartialBase"));
class PartialGuild extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "Guild";
        this.memberCount = data.number || 0;
        this.available = data.unavailable ? !data.unavailable : true;
    }
    toJSON() {
        return {
            member_count: this.memberCount,
            unavailable: !this.available,
            ...super.toJSON()
        };
    }
    async fetchMembers(options) {
        const GuildMember = (await Promise.resolve().then(() => __importStar(require("../GuildMember")))).default;
        if (typeof options === "string")
            return this.client._snow.guild.getGuildMember(this.id, options).then(d => d ? new GuildMember(d, this.client) : null);
        else {
            const payload = {};
            if (options.limit)
                payload["limit"] = options.limit;
            if (options.after)
                payload["after"] = options.after;
            const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
            if (!data || data.length === 0)
                return null;
            if (!options.query)
                return data.map(d => new GuildMember(d, this.client));
            else if (options.ids)
                return data.filter(d => { var _a; return (d.user ? (_a = options.ids) === null || _a === void 0 ? void 0 : _a.includes(d.user.id) : false); }).map(d => new GuildMember(d, this.client));
            else
                return data.filter(d => { var _a; return ((_a = d.nick) === null || _a === void 0 ? void 0 : _a.includes(options.query)) || (d.user ? d.user.username.includes(options.query) : false) || (d.user ? d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false); }).map(d => new GuildMember(d, this.client));
        }
    }
}
module.exports = PartialGuild;
