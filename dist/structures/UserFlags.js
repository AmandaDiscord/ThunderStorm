"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const BitField_1 = __importDefault(require("./BitField"));
class UserFlags extends BitField_1.default {
    constructor(bits) {
        super(bits || 0);
        this.FLAGS = Constants_1.default.USER_FLAGS;
    }
}
UserFlags.default = UserFlags;
UserFlags.FLAGS = Constants_1.default.USER_FLAGS;
module.exports = UserFlags;
