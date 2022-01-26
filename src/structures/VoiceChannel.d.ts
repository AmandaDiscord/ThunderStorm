import BaseGuildVoiceChannel from "./BaseGuildVoiceChannel";
import Constants from "../util/Constants";
declare class VoiceChannel extends BaseGuildVoiceChannel {
    bitrate: number;
    userLimit: number;
    rtcRegion: string | null;
    type: typeof Constants.ChannelTypes[2];
    static readonly default: typeof VoiceChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").VoiceChannelData);
    toJSON(): import("discord-typings").VoiceChannelData;
    _patch(data: import("discord-typings").VoiceChannelData): void;
}
export = VoiceChannel;
