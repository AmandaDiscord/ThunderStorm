"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../../util/Constants"));
const TextBasedChannel_1 = __importDefault(require("../interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
// @ts-ignore
class PartialChannel extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.partialType = "Channel";
        const PartialGuild = require("./PartialGuild");
        const Permissions = require("../../util/Permissions");
        this.guild = data.guild_id ? new PartialGuild(client, { id: data.guild_id }) : null;
        this.type = data.type || "UNKNOWN";
        this.name = data.name || "UNKNOWN";
        this.permissions = new Permissions(BigInt(data.permissions || 0)).freeze();
        this.topic = data.topic || null;
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        return {
            guild_id: this.guild ? this.guild.id : null,
            type: Number(Object.keys(Constants_1.default.ChannelTypes).find(k => Constants_1.default.ChannelTypes[k] === this.type) || 0),
            name: this.name,
            permissions: this.permissions.bitfield.toString(),
            ...super.toJSON()
        };
    }
}
PartialChannel.default = PartialChannel;
TextBasedChannel_1.default.applyToClass(PartialChannel, true);
module.exports = PartialChannel;
