import TextChannel from "./TextChannel";
declare class NewsChannel extends TextChannel {
    type: "news";
    constructor(data: import("@amanda/discordtypings").NewsChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").NewsChannelData;
}
export = NewsChannel;
