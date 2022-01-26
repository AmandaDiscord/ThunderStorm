import GuildChannel from "./GuildChannel";
import Constants from "../util/Constants";
declare class CategoryChannel extends GuildChannel {
    nsfw: boolean;
    type: typeof Constants.ChannelTypes[4];
    static readonly default: typeof CategoryChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").CategoryChannelData);
    toJSON(): import("discord-typings").CategoryChannelData;
    _patch(data: import("discord-typings").CategoryChannelData): void;
}
export = CategoryChannel;
