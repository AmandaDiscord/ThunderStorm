"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Collection_1 = __importDefault(require("./Util/Collection"));
class CommandOption {
    constructor(command, data) {
        this.options = new Collection_1.default();
        this.value = null;
        this.command = command;
        this._patch(data);
    }
    toJSON() {
        return {
            name: this.name,
            // @ts-ignore
            type: Number(Object.keys(Constants_1.default.COMMAND_TYPES).find(k => Constants_1.default.CHANNEL_TYPES[k] === this.type)),
            value: typeof this.value === "boolean" ? Number(this.value) : this.value || undefined,
            options: [...this.options.values()].map(o => o.toJSON())
        };
    }
    _patch(data) {
        if (data.name)
            this.name = data.name;
        if (data.type)
            this.type = Constants_1.default.COMMAND_TYPES[data.type];
        if (data.value !== undefined) {
            if (data.value === 5)
                this.value = !!data.value;
            else
                this.value = data.value;
        }
        else if (data.options) {
            this.options.clear();
            for (const option of data.options)
                this.options.set(option.name, new CommandOption(this.command, option));
        }
    }
}
module.exports = CommandOption;
