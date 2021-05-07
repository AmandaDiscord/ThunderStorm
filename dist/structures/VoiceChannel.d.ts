import GuildChannel from "./GuildChannel";
declare class VoiceChannel extends GuildChannel {
    bitrate: number;
    userLimit: number;
    rtcRegion: string | null;
    type: "voice";
    constructor(data: import("@amanda/discordtypings").VoiceChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").VoiceChannelData;
    _patch(data: import("@amanda/discordtypings").VoiceChannelData): void;
}
export = VoiceChannel;
