import GuildChannel from "./GuildChannel";
declare class BaseGuildVoiceChannel extends GuildChannel {
    rtcRegion: string | null;
    bitrate: number;
    userLimit: number;
    static readonly default: typeof BaseGuildVoiceChannel;
    _patch(data: import("discord-typings").VoiceChannelData): void;
}
export = BaseGuildVoiceChannel;
