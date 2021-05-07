import Collection from "./Util/Collection";
import PartialChannel from "./Partial/PartialChannel";
import PartialGuild from "./Partial/PartialGuild";
import PartialUser from "./Partial/PartialUser";
import NewsChannel from "./NewsChannel";
import ThreadMember from "./ThreadMember";
declare class ThreadNewsChannel extends NewsChannel {
    type: "news-thread";
    ownerID: string;
    owner: PartialUser;
    memberCount: number;
    messageCount: number;
    meta: import("./ThreadMetadata");
    members: Collection<string, ThreadMember>;
    parent: PartialChannel;
    guild: PartialGuild;
    constructor(data: import("@amanda/discordtypings").ThreadChannelData, client: import("./Client"));
    fetchMembers(): Promise<ThreadMember[] | null>;
    toJSON(): import("@amanda/discordtypings").ThreadChannelData;
    _patch(data: import("@amanda/discordtypings").ThreadChannelData): void;
}
export = ThreadNewsChannel;
