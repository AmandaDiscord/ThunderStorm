"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Interaction_1 = __importDefault(require("./Interaction"));
const InteractionWebhook_1 = __importDefault(require("./InteractionWebhook"));
const InteractionResponses_1 = __importDefault(require("./interfaces/InteractionResponses"));
const Constants_1 = require("../util/Constants");
class MessageComponentInteraction extends Interaction_1.default {
    constructor(client, data) {
        var _a, _b;
        super(client, data);
        const Message = require("./Message");
        const PartialChannel = require("./Partial/PartialChannel");
        this.message = data.message ? new Message(this.client, data.message, this.channel && this.channel.id === data.message.channel_id ? this.channel : new PartialChannel(this.client, { id: data.message.channel_id, guild_id: data.message.guild_id })) : null;
        this.customID = ((_a = data.data) === null || _a === void 0 ? void 0 : _a.custom_id) || "";
        this.componentType = MessageComponentInteraction.resolveType((_b = data.data) === null || _b === void 0 ? void 0 : _b.component_type);
        this.deferred = false;
        this.replied = false;
        this.webhook = new InteractionWebhook_1.default(this.client, this.applicationID, this.token);
    }
    static resolveType(type) {
        return typeof type === "string" ? type : Constants_1.MessageComponentTypes[type];
    }
}
InteractionResponses_1.default.applyToClass(MessageComponentInteraction);
module.exports = MessageComponentInteraction;
