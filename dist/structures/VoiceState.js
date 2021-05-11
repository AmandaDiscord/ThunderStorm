"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildMember_1 = __importDefault(require("./GuildMember"));
class VoiceState {
    constructor(data, client) {
        this.channelID = null;
        this.guildID = null;
        this.member = null;
        this.serverDeaf = false;
        this.selfDeaf = false;
        this.serverMute = false;
        this.selfMute = false;
        this.sessionID = "";
        this.streaming = false;
        this.supress = false;
        this.client = client;
        this._patch(data);
    }
    toJSON() {
        return {
            channel_id: this.channelID,
            guild_id: this.guildID,
            member: this.member ? this.member.toJSON() : null,
            deaf: this.serverDeaf,
            self_deaf: this.selfDeaf,
            mute: this.serverMute,
            self_mute: this.selfMute,
            session_id: this.sessionID,
            self_stream: this.streaming,
            suppress: this.supress,
            user_id: this.id
        };
    }
    // @ts-ignore Weird Discord structures be like
    _patch(data) {
        if (data.channel_id)
            this.channelID = data.channel_id;
        if (data.guild_id)
            this.guildID = data.guild_id;
        if (data.member)
            this.member = new GuildMember_1.default(data.member, this.client);
        if (data.deaf != undefined)
            this.serverDeaf = data.deaf;
        if (data.self_deaf != undefined)
            this.selfDeaf = data.self_deaf;
        if (data.mute != undefined)
            this.serverMute = data.mute;
        if (data.self_mute != undefined)
            this.selfMute = data.self_mute;
        if (data.session_id)
            this.sessionID = data.session_id;
        if (data.self_stream != undefined)
            this.streaming = data.self_stream;
        if (data.suppress != undefined)
            this.supress = data.suppress;
        if (data.user_id)
            this.id = data.user_id;
    }
}
module.exports = VoiceState;
