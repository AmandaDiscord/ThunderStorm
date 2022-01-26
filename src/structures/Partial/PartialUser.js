"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
// @ts-ignore
class PartialUser extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.lastMessageId = null;
        this.lastMessage = null;
        this.partialType = "User";
    }
    toString() {
        return `<@${this.id}>`;
    }
}
PartialUser.default = PartialUser;
TextBasedChannel_1.default.applyToClass(PartialUser);
module.exports = PartialUser;
