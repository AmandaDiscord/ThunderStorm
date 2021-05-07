import Collection from "./Util/Collection";
import TextChannel from "./TextChannel";
import ThreadMember from "./ThreadMember";
declare class ThreadTextChannel extends TextChannel {
    type: "text-thread";
    private: boolean;
    ownerID: string;
    owner: import("./Partial/PartialUser");
    memberCount: number;
    messageCount: number;
    meta: import("./ThreadMetadata");
    members: Collection<string, ThreadMember>;
    parent: import("./Partial/PartialChannel");
    guild: import("./Partial/PartialGuild");
    constructor(data: import("@amanda/discordtypings").ThreadChannelData, client: import("./Client"));
    fetchMembers(): Promise<ThreadMember[] | null>;
    toJSON(): import("@amanda/discordtypings").ThreadChannelData;
    _patch(data: import("@amanda/discordtypings").ThreadChannelData): void;
}
export = ThreadTextChannel;
