import GuildChannel from "./GuildChannel";
declare class VoiceChannel extends GuildChannel {
    bitrate: number;
    userLimit: number;
    type: "voice";
    constructor(data: import("@amanda/discordtypings").VoiceChannelData, client: import("./Client"));
    toJSON(): {
        id: string;
        name: string;
        guild_id: string;
        parent_id: string | null;
        position: number;
        bitrate: number;
        user_limit: number;
        type: number;
    };
}
export = VoiceChannel;
