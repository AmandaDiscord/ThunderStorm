import VoiceChannel from "./VoiceChannel";
declare class StageChannel extends VoiceChannel {
    type: "stage";
    constructor(data: import("@amanda/discordtypings").StageChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").StageChannelData;
}
export = StageChannel;
