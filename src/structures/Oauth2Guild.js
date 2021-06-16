"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseGuild_1 = __importDefault(require("./BaseGuild"));
const Permissions_1 = __importDefault(require("../util/Permissions"));
class OAuth2Guild extends BaseGuild_1.default {
    constructor(client, data) {
        super(client, data);
        this.owner = data.owner;
        this.permissions = new Permissions_1.default(BigInt(data.permissions || 0)).freeze();
    }
}
module.exports = OAuth2Guild;
