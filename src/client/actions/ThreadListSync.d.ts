import { Collection } from "@discordjs/collection";
import Action from "./Action";
import ThreadTextChannel from "../../structures/ThreadTextChannel";
import ThreadNewsChannel from "../../structures/ThreadNewsChannel";
declare class ThreadListSyncAction extends Action {
    static readonly default: typeof ThreadListSyncAction;
    handle(data: import("discord-typings").ThreadListSyncData): {
        syncedThreads: Collection<string, ThreadNewsChannel | ThreadTextChannel>;
    };
    removeStale(channel: any): void;
}
export = ThreadListSyncAction;
