"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("./Util/Collection"));
class ButtonRow {
    constructor(children) {
        this.children = new Collection_1.default();
        for (const child of children)
            this.children.set(child.id, child);
    }
    toJSON() {
        return {
            type: 1,
            components: [...this.children.values()].map(bn => bn.toJSON())
        };
    }
}
module.exports = ButtonRow;
