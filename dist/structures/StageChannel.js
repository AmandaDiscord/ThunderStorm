"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const VoiceChannel_1 = __importDefault(require("./VoiceChannel"));
class StageChannel extends VoiceChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.type = "stage";
    }
    toJSON() {
        return Object.assign(super.toJSON(), { type: 13 });
    }
}
module.exports = StageChannel;
