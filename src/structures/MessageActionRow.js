"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const Constants_1 = require("../util/Constants");
class MessageActionRow extends BaseMessageComponent_1.default {
    constructor(data) {
        var _a, _b;
        super({ type: "ACTION_ROW" });
        this.components = (_b = (_a = data) === null || _a === void 0 ? void 0 : _a.components, (_b !== null && _b !== void 0 ? _b : [])).map(c => BaseMessageComponent_1.default.create(c, null, true));
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
module.exports = MessageActionRow;
