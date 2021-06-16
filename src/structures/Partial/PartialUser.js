"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../Interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
// @ts-ignore
class PartialUser extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.lastMessageID = null;
        this.lastMessage = null;
        this.partialType = "User";
    }
    toString() {
        return `<@${this.id}>`;
    }
}
TextBasedChannel_1.default.applyToClass(PartialUser);
module.exports = PartialUser;
