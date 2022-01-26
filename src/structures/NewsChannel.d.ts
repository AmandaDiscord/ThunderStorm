import TextChannel from "./TextChannel";
import Constants from "../util/Constants";
declare class NewsChannel extends TextChannel {
    type: typeof Constants.ChannelTypes[5];
    static readonly default: typeof NewsChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").NewsChannelData);
    toJSON(): import("discord-typings").NewsChannelData;
}
export = NewsChannel;
