"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const immutable_1 = __importDefault(require("@augu/immutable"));
class Collection extends immutable_1.default.Collection {
    constructor(from) {
        super(from);
    }
}
module.exports = Collection;
