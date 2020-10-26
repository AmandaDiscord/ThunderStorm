"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("../Interfaces/TextBasedChannel"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
class PartialUser extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "User";
    }
    toString() {
        return `<@${this.id}>`;
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
}
module.exports = PartialUser;
