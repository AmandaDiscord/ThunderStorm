import VoiceChannel from "./VoiceChannel";
import Constants from "../util/Constants";
declare class StageChannel extends VoiceChannel {
    type: typeof Constants.ChannelTypes[13];
    static readonly default: typeof StageChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").StageChannelData);
    toJSON(): import("discord-typings").StageChannelData;
}
export = StageChannel;
