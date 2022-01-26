"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const MessageComponentInteraction_1 = __importDefault(require("./MessageComponentInteraction"));
class SelectMenuInteraction extends MessageComponentInteraction_1.default {
    constructor(client, data) {
        var _a, _b, _c;
        super(client, data);
        this.values = (_c = (_b = (_a = data.data) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.map(i => i.value)) !== null && _c !== void 0 ? _c : [];
    }
}
SelectMenuInteraction.default = SelectMenuInteraction;
module.exports = SelectMenuInteraction;
