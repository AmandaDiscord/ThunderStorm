"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PartialBase_1 = __importDefault(require("./PartialBase"));
const PartialGuild_1 = __importDefault(require("./PartialGuild"));
class PartialRole extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "Role";
        this.guild = data.guild_id ? new PartialGuild_1.default({ id: data.guild_id }, this.client) : null;
    }
    toString() {
        return `<@&${this.id}>`;
    }
    toJSON() {
        return {
            guild_id: this.guild ? this.guild.id : null,
            ...super.toJSON()
        };
    }
}
module.exports = PartialRole;
