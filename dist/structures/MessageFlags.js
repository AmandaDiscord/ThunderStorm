"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const BitField_1 = __importDefault(require("./BitField"));
class MessageFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = Constants_1.default.MESSAGE_FLAGS;
    }
}
MessageFlags.default = MessageFlags;
MessageFlags.FLAGS = Constants_1.default.MESSAGE_FLAGS;
module.exports = MessageFlags;
