import BaseGuildVoiceChannel from "./BaseGuildVoiceChannel";
declare class VoiceChannel extends BaseGuildVoiceChannel {
    bitrate: number;
    userLimit: number;
    rtcRegion: string | null;
    type: "voice";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").VoiceChannelData);
    toJSON(): import("@amanda/discordtypings").VoiceChannelData;
    _patch(data: import("@amanda/discordtypings").VoiceChannelData): void;
}
export = VoiceChannel;
