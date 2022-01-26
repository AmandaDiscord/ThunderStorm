"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const GuildMember_1 = __importDefault(require("./GuildMember"));
class VoiceState {
    constructor(client, data) {
        this.channelId = null;
        this.guildId = null;
        this.member = null;
        this.serverDeaf = false;
        this.selfDeaf = false;
        this.serverMute = false;
        this.selfMute = false;
        this.sessionId = "";
        this.streaming = false;
        this.supress = false;
        this.client = client;
        this._patch(data);
    }
    toJSON() {
        return {
            channel_id: this.channelId,
            guild_id: this.guildId,
            member: this.member ? this.member.toJSON() : null,
            deaf: this.serverDeaf,
            self_deaf: this.selfDeaf,
            mute: this.serverMute,
            self_mute: this.selfMute,
            session_id: this.sessionId,
            self_stream: this.streaming,
            suppress: this.supress,
            user_id: this.id
        };
    }
    _patch(data) {
        if (data.channel_id)
            this.channelId = data.channel_id;
        if (data.guild_id)
            this.guildId = data.guild_id;
        if (data.member !== undefined)
            this.member = data.member ? new GuildMember_1.default(this.client, data.member) : null;
        if (data.deaf != undefined)
            this.serverDeaf = data.deaf;
        if (data.self_deaf != undefined)
            this.selfDeaf = data.self_deaf;
        if (data.mute != undefined)
            this.serverMute = data.mute;
        if (data.self_mute != undefined)
            this.selfMute = data.self_mute;
        if (data.session_id)
            this.sessionId = data.session_id;
        if (data.self_stream != undefined)
            this.streaming = data.self_stream;
        if (data.suppress != undefined)
            this.supress = data.suppress;
        if (data.user_id)
            this.id = data.user_id;
    }
}
VoiceState.default = VoiceState;
module.exports = VoiceState;
