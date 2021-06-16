import TextChannel from "./TextChannel";
declare class NewsChannel extends TextChannel {
    type: "news";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").NewsChannelData);
    toJSON(): import("@amanda/discordtypings").NewsChannelData;
}
export = NewsChannel;
