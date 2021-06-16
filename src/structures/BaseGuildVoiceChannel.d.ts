import GuildChannel from "./GuildChannel";
declare class BaseGuildVoiceChannel extends GuildChannel {
    rtcRegion: string | null;
    bitrate: number;
    userLimit: number;
    _patch(data: import("@amanda/discordtypings").VoiceChannelData): void;
}
export = BaseGuildVoiceChannel;
