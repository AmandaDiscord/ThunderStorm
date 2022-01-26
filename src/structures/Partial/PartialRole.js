"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PartialBase_1 = __importDefault(require("./PartialBase"));
// @ts-ignore
class PartialRole extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.partialType = "Role";
        const PartialGuild = require("./PartialGuild");
        this.guild = data.guild_id ? new PartialGuild(this.client, { id: data.guild_id }) : null;
        this.name = data.name || "deleted-role";
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
PartialRole.default = PartialRole;
module.exports = PartialRole;
