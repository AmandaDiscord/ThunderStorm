"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const BitField_1 = __importDefault(require("./BitField"));
class Permissions extends BitField_1.default {
    constructor(bits) {
        super(bits);
    }
    static get FLAGS() {
        return Constants_1.default.PERMISSION_FLAGS;
    }
    get FLAGS() {
        return Constants_1.default.PERMISSION_FLAGS;
    }
    any(permission, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any(permission);
    }
    has(permission, checkAdmin = true) {
        return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.has(permission);
    }
}
Permissions.default = Permissions;
Permissions.ALL = Object.values(Constants_1.default.PERMISSION_FLAGS).reduce((all, p) => all | p, BigInt(0));
Permissions.DEFAULT = BigInt(10432467);
module.exports = Permissions;
