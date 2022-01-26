import { Collection } from "@discordjs/collection";
import TextChannel from "./TextChannel";
import ThreadMember from "./ThreadMember";
import Constants from "../util/Constants";
declare class ThreadTextChannel extends TextChannel {
    type: typeof Constants.ChannelTypes[11] | typeof Constants.ChannelTypes[12];
    private: boolean;
    ownerId: string;
    owner: import("./Partial/PartialUser");
    memberCount: number;
    messageCount: number;
    meta: import("./ThreadMetadata");
    members: Collection<string, ThreadMember>;
    parent: import("./Partial/PartialChannel");
    guild: import("./Partial/PartialGuild");
    static readonly default: typeof ThreadTextChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").ThreadChannelData);
    fetchMembers(): Promise<ThreadMember[] | null>;
    toJSON(): import("discord-typings").ThreadChannelData;
    _patch(data: import("discord-typings").ThreadChannelData): void;
}
export = ThreadTextChannel;
