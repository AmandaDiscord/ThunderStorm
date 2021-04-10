"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Permissions_1 = __importDefault(require("./Permissions"));
class PermissionOverwrites {
    constructor(guildChannel, data) {
        this.channel = guildChannel;
        this.id = data.id;
        this.type = data.type === 0 ? "role" : "member";
        this.deny = new Permissions_1.default(BigInt(data.deny)).freeze();
        this.allow = new Permissions_1.default(BigInt(data.allow)).freeze();
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type === "role" ? 0 : 1,
            deny: this.deny.bitfield.toString(),
            allow: this.allow.bitfield.toString()
        };
    }
}
module.exports = PermissionOverwrites;
