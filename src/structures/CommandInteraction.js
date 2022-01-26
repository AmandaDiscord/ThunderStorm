"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseCommandInteraction_1 = __importDefault(require("./BaseCommandInteraction"));
const CommandInteractionOptionResolver_1 = __importDefault(require("./CommandInteractionOptionResolver"));
class CommandInteraction extends BaseCommandInteraction_1.default {
    constructor(client, data) {
        var _a, _b, _c;
        super(client, data);
        this.options = new CommandInteractionOptionResolver_1.default(this.client, (_b = (_a = data.data.options) === null || _a === void 0 ? void 0 : _a.map(option => this.transformOption(option, data.data.resolved))) !== null && _b !== void 0 ? _b : [], this.transformResolved((_c = data.data.resolved) !== null && _c !== void 0 ? _c : {}));
    }
    toString() {
        const properties = [
            this.commandName,
            this.options._group,
            this.options._subcommand,
            ...this.options._hoistedOptions.map(o => `${o.name}:${o.value}`)
        ];
        return `/${properties.filter(Boolean).join(" ")}`;
    }
}
module.exports = CommandInteraction;
