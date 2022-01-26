"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseCommandInteraction_1 = __importDefault(require("./BaseCommandInteraction"));
const CommandInteractionOptionResolver_1 = __importDefault(require("./CommandInteractionOptionResolver"));
const Constants_1 = require("../util/Constants");
class ContextMenuInteraction extends BaseCommandInteraction_1.default {
    constructor(client, data) {
        super(client, data);
        this.options = new CommandInteractionOptionResolver_1.default(this.client, this.resolveContextMenuOptions(data.data), this.transformResolved(data.data.resolved));
        this.targetId = data.data.target_id;
        this.targetType = Constants_1.ApplicationCommandTypes[data.data.type];
    }
    resolveContextMenuOptions({ target_id, resolved }) {
        var _a, _b;
        const Message = require("./Message");
        const result = [];
        if ((_a = resolved.users) === null || _a === void 0 ? void 0 : _a[target_id]) {
            result.push(this.transformOption({ name: "user", type: Constants_1.ApplicationCommandOptionTypes.USER, value: target_id }, resolved));
        }
        if ((_b = resolved.messages) === null || _b === void 0 ? void 0 : _b[target_id]) {
            result.push({
                name: "message",
                type: "_MESSAGE",
                value: target_id,
                message: new Message(this.client, resolved.messages[target_id], this.channel)
            });
        }
        return result;
    }
}
ContextMenuInteraction.default = ContextMenuInteraction;
module.exports = ContextMenuInteraction;
