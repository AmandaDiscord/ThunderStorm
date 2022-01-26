import { Collection } from "@discordjs/collection";
import NewsChannel from "./NewsChannel";
import ThreadMember from "./ThreadMember";
import Constants from "../util/Constants";
declare class ThreadNewsChannel extends NewsChannel {
    type: typeof Constants.ChannelTypes[10];
    ownerId: string;
    owner: import("./Partial/PartialUser");
    memberCount: number;
    messageCount: number;
    meta: import("./ThreadMetadata");
    members: Collection<string, ThreadMember>;
    parent: import("./Partial/PartialChannel");
    defaultAutoArchiveDuration: number;
    static readonly default: typeof ThreadNewsChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").ThreadChannelData);
    fetchMembers(): Promise<ThreadMember[] | null>;
    toJSON(): import("discord-typings").ThreadChannelData;
    _patch(data: import("discord-typings").ThreadChannelData): void;
}
export = ThreadNewsChannel;
