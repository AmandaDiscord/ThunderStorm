"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const CommandInteractionOptionResolver_1 = __importDefault(require("./CommandInteractionOptionResolver"));
const Interaction_1 = __importDefault(require("./Interaction"));
const Constants_1 = require("../util/Constants");
class AutocompleteInteraction extends Interaction_1.default {
    constructor(client, data) {
        var _a, _b;
        super(client, data);
        this.responded = false;
        this.commandId = data.data.id;
        this.commandName = data.data.name;
        this.options = new CommandInteractionOptionResolver_1.default(this.client, (_b = (_a = data.data.options) === null || _a === void 0 ? void 0 : _a.map(option => this.transformOption(option))) !== null && _b !== void 0 ? _b : []);
    }
    get command() {
        var _a, _b, _c;
        const id = this.commandId;
        return (_c = (_b = (_a = this.guild) === null || _a === void 0 ? void 0 : _a.commands.cache.get(id)) !== null && _b !== void 0 ? _b : this.client.application.commands.cache.get(id)) !== null && _c !== void 0 ? _c : null;
    }
    transformOption(option) {
        const result = {
            name: option.name,
            type: Constants_1.ApplicationCommandOptionTypes[option.type]
        };
        if ("value" in option)
            result.value = option.value;
        if ("options" in option)
            result.options = option.options.map(opt => this.transformOption(opt));
        if ("focused" in option)
            result.focused = option.focused;
        return result;
    }
    async respond(options) {
        if (this.responded)
            throw new Error("INTERACTION_ALREADY_REPLIED");
        await this.client.api.interactions(this.id, this.token).callback.post({
            data: {
                type: Constants_1.InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
                data: {
                    choices: options
                }
            }
        });
        this.responded = true;
    }
}
AutocompleteInteraction.default = AutocompleteInteraction;
module.exports = AutocompleteInteraction;
