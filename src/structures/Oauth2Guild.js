"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseGuild_1 = __importDefault(require("./BaseGuild"));
const Permissions_1 = __importDefault(require("../util/Permissions"));
class OAuth2Guild extends BaseGuild_1.default {
    constructor(client, data) {
        super(client, data);
        this.owner = data.owner;
        this.permissions = new Permissions_1.default(BigInt(data.permissions || 0)).freeze();
    }
}
OAuth2Guild.default = OAuth2Guild;
module.exports = OAuth2Guild;
