"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = require("../../util/Constants");
const MessageFlags_1 = __importDefault(require("../../util/MessageFlags"));
const APIMessage_1 = __importDefault(require("../APIMessage"));
class InteractionResponses {
    async defer({ ephemeral } = {}) {
        if (this.deferred || this.replied)
            throw new Error("INTERACTION_ALREADY_REPLIED");
        await this.client._snow.interaction.createInteractionResponse(this.id, this.token, {
            type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                flags: ephemeral ? Number(MessageFlags_1.default.FLAGS.EPHEMERAL) : undefined
            }
        });
        this.deferred = true;
    }
    async reply(options) {
        if (this.deferred || this.replied)
            throw new Error("INTERACTION_ALREADY_REPLIED");
        let apiMessage;
        if (options instanceof APIMessage_1.default)
            apiMessage = options;
        else
            apiMessage = APIMessage_1.default.create(this, options);
        const { data, files } = await apiMessage.resolveData().resolveFiles();
        await this.client._snow.interaction.createInteractionResponse(this.id, this.token, {
            type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
            data: Object.assign({}, data, { files: files })
        });
        this.replied = true;
    }
    fetchReply() {
        return this.webhook.fetchMessage("@original");
    }
    editReply(options) {
        return this.webhook.editMessage("@original", options);
    }
    async deleteReply() {
        await this.webhook.deleteMessage("@original");
    }
    followUp(options) {
        return this.webhook.send(options);
    }
    async deferUpdate() {
        if (this.deferred || this.replied)
            throw new Error("INTERACTION_ALREADY_REPLIED");
        await this.client._snow.interaction.createInteractionResponse(this.id, this.token, {
            type: Constants_1.InteractionResponseTypes.DEFERRED_MESSAGE_UPDATE
        });
        this.deferred = true;
    }
    async update(options) {
        if (this.deferred || this.replied)
            throw new Error("INTERACTION_ALREADY_REPLIED");
        let apiMessage;
        if (options instanceof APIMessage_1.default)
            apiMessage = options;
        else
            apiMessage = APIMessage_1.default.create(this, options);
        const { data, files } = await apiMessage.resolveData().resolveFiles();
        await this.client._snow.interaction.createInteractionResponse(this.id, this.token, {
            type: Constants_1.InteractionResponseTypes.UPDATE_MESSAGE,
            data: Object.assign({}, data, { files: files })
        });
        this.replied = true;
    }
    static applyToClass(structure, ignore = []) {
        const props = ["defer", "reply", "fetchReply", "editReply", "deleteReply", "followUp", "deferUpdate", "update"];
        for (const prop of props) {
            if (ignore.includes(prop))
                continue;
            Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(InteractionResponses.prototype, prop));
        }
    }
}
module.exports = InteractionResponses;
