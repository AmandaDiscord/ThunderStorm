"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class VoiceStateUpdate extends Action_1.default {
    handle(data) {
        const VoiceState = require("../../structures/VoiceState");
        const state = new VoiceState(this.client, data);
        this.client.emit(Constants_1.Events.VOICE_STATE_UPDATE, state);
    }
}
VoiceStateUpdate.default = VoiceStateUpdate;
module.exports = VoiceStateUpdate;
