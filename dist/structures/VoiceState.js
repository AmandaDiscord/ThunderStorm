"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildMember_1 = __importDefault(require("./GuildMember"));
class VoiceState {
    constructor(data, client) {
        this.client = client;
        this.channelID = data.channel_id || null;
        this.guildID = data.guild_id || null;
        this.member = data.member ? new GuildMember_1.default(data.member, client) : null;
        this.serverDeaf = data.deaf;
        this.selfDeaf = data.self_deaf;
        this.serverMute = data.mute;
        this.selfMute = data.self_mute;
        this.id = data.user_id;
        this.sessionID = data.session_id;
        this.streaming = data.self_stream ? data.self_stream : false;
        this.supress = data.suppress;
    }
}
module.exports = VoiceState;
