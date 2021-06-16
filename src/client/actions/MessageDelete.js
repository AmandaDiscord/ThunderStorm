"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageDeleteAction extends Action_1.default {
    handle(data) {
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const message = new PartialMessage(this.client, data);
        this.client.emit(Constants_1.Events.MESSAGE_DELETE, message);
        return { message };
    }
}
module.exports = MessageDeleteAction;
