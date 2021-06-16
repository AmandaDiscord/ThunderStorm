import VoiceChannel from "./VoiceChannel";
declare class StageChannel extends VoiceChannel {
    type: "stage";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").StageChannelData);
    toJSON(): import("@amanda/discordtypings").StageChannelData;
}
export = StageChannel;
