"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
const PartialGuild_1 = __importDefault(require("../../structures/Partial/PartialGuild"));
const ThreadTextChannel_1 = __importDefault(require("../../structures/ThreadTextChannel"));
const ThreadNewsChannel_1 = __importDefault(require("../../structures/ThreadNewsChannel"));
const ThreadMember_1 = __importDefault(require("../../structures/ThreadMember"));
class ThreadListSyncAction extends Action_1.default {
    handle(data) {
        const guild = new PartialGuild_1.default(this.client, { id: data.guild_id });
        const syncedThreads = data.threads.reduce((coll, rawThread) => {
            const thread = rawThread.type === 10 ? new ThreadNewsChannel_1.default(guild, rawThread) : new ThreadTextChannel_1.default(guild, rawThread);
            return coll.set(thread.id, thread);
        }, new collection_1.Collection());
        for (const rawMember of Object.values(data.members)) {
            // Discord sends the thread id as id in this object
            const thread = syncedThreads.get(rawMember.id);
            if (thread) {
                thread.members.set(rawMember.user_id, new ThreadMember_1.default(thread, rawMember));
            }
        }
        this.client.emit(Constants_1.Events.THREAD_LIST_SYNC, syncedThreads);
        return { syncedThreads };
    }
    removeStale(channel) {
        void 0;
    }
}
ThreadListSyncAction.default = ThreadListSyncAction;
module.exports = ThreadListSyncAction;
