"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const AutocompleteInteraction_1 = __importDefault(require("../../structures/AutocompleteInteraction"));
const ButtonInteraction_1 = __importDefault(require("../../structures/ButtonInteraction"));
const CommandInteraction_1 = __importDefault(require("../../structures/CommandInteraction"));
const ContextMenuInteraction_1 = __importDefault(require("../../structures/ContextMenuInteraction"));
const SelectMenuInteraction_1 = __importDefault(require("../../structures/SelectMenuInteraction"));
const Constants_1 = require("../../util/Constants");
class InteractionCreateAction extends Action_1.default {
    handle(data) {
        const client = this.client;
        // Resolve and cache partial channels for Interaction#channel getter
        this.getChannel(data);
        let InteractionType;
        switch (data.type) {
            case Constants_1.InteractionTypes.APPLICATION_COMMAND:
                switch (data.data.type) {
                    case Constants_1.ApplicationCommandTypes.CHAT_INPUT:
                        InteractionType = CommandInteraction_1.default;
                        break;
                    case Constants_1.ApplicationCommandTypes.USER:
                    case Constants_1.ApplicationCommandTypes.MESSAGE:
                        InteractionType = ContextMenuInteraction_1.default;
                        break;
                    default:
                        client.emit(Constants_1.Events.DEBUG, `[INTERACTION] Received application command interaction with unknown type: ${data.data.type}`);
                        return;
                }
                break;
            case Constants_1.InteractionTypes.MESSAGE_COMPONENT:
                switch (data.data.component_type) {
                    case Constants_1.MessageComponentTypes.BUTTON:
                        InteractionType = ButtonInteraction_1.default;
                        break;
                    case Constants_1.MessageComponentTypes.SELECT_MENU:
                        InteractionType = SelectMenuInteraction_1.default;
                        break;
                    default:
                        client.emit(Constants_1.Events.DEBUG, `[INTERACTION] Received component interaction with unknown type: ${data.data.component_type}`);
                        return;
                }
                break;
            case Constants_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE:
                InteractionType = AutocompleteInteraction_1.default;
                break;
            default:
                client.emit(Constants_1.Events.DEBUG, `[INTERACTION] Received interaction with unknown type: ${data.type}`);
                return;
        }
        const interaction = new InteractionType(client, data);
        client.emit(Constants_1.Events.INTERACTION_CREATE, interaction);
    }
}
InteractionCreateAction.default = InteractionCreateAction;
module.exports = InteractionCreateAction;
