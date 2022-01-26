import GuildChannel from "./GuildChannel";
import Constants from "../util/Constants";
declare class StoreChannel extends GuildChannel {
    nsfw: boolean;
    type: typeof Constants.ChannelTypes[6];
    static readonly default: typeof StoreChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").StoreChannelData);
    _patch(data: import("discord-typings").StageChannelData): void;
}
export = StoreChannel;
