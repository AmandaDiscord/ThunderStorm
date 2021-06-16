import Collection from "../util/Collection";
import NewsChannel from "./NewsChannel";
import ThreadMember from "./ThreadMember";
declare class ThreadNewsChannel extends NewsChannel {
    type: "news-thread";
    ownerID: string;
    owner: import("./Partial/PartialUser");
    memberCount: number;
    messageCount: number;
    meta: import("./ThreadMetadata");
    members: Collection<string, ThreadMember>;
    parent: import("./Partial/PartialChannel");
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").ThreadChannelData);
    fetchMembers(): Promise<ThreadMember[] | null>;
    toJSON(): import("@amanda/discordtypings").ThreadChannelData;
    _patch(data: import("@amanda/discordtypings").ThreadChannelData): void;
}
export = ThreadNewsChannel;
