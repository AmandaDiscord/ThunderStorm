"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
class PartialThreadChannel extends PartialBase_1.default {
    constructor(guild, data) {
        super(guild.client, data);
        this.type = "public-thread";
        this.partialType = "Thread";
        this.memberCount = 0;
        const PartialChannel = require("./PartialChannel");
        this.guild = guild;
        this.parent = new PartialChannel(guild.client, { id: data.channel_id, guild_id: data.guild_id });
        if (data.number)
            this.memberCount = data.number || 0;
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        var _a;
        return {
            guild_id: ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.id) || null,
            parent_id: this.parent.id,
            member_count: this.memberCount,
            ...super.toJSON()
        };
    }
}
TextBasedChannel_1.default.applyToClass(PartialThreadChannel, true);
module.exports = PartialThreadChannel;
