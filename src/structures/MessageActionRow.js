"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const Constants_1 = require("../util/Constants");
// @ts-ignore
class MessageActionRow extends BaseMessageComponent_1.default {
    constructor(data) {
        var _a;
        super({ type: "ACTION_ROW" });
        this.components = ((_a = data === null || data === void 0 ? void 0 : data.components) !== null && _a !== void 0 ? _a : []).map(c => BaseMessageComponent_1.default.create(c, null, true));
    }
    addComponents(...components) {
        this.components.push(...components.flat(Infinity).map(c => BaseMessageComponent_1.default.create(c, null, true)));
        return this;
    }
    spliceComponents(index, deleteCount, ...components) {
        this.components.splice(index, deleteCount, ...components.flat(Infinity).map(c => BaseMessageComponent_1.default.create(c, null, true)));
        return this;
    }
    toJSON() {
        return {
            components: this.components.map(c => c.toJSON()),
            type: Constants_1.MessageComponentTypes[this.type]
        };
    }
}
MessageActionRow.default = MessageActionRow;
module.exports = MessageActionRow;
