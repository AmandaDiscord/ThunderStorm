"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
const PartialGuild_1 = __importDefault(require("../../structures/Partial/PartialGuild"));
const ThreadTextChannel_1 = __importDefault(require("../../structures/ThreadTextChannel"));
const ThreadNewsChannel_1 = __importDefault(require("../../structures/ThreadNewsChannel"));
class ThreadCreateAction extends Action_1.default {
    handle(data) {
        const guild = new PartialGuild_1.default(this.client, { id: data.guild_id });
        const thread = data.type === 10 ? new ThreadNewsChannel_1.default(guild, data) : new ThreadTextChannel_1.default(guild, data);
        this.client.emit(Constants_1.Events.THREAD_CREATE, thread);
        return { thread };
    }
}
ThreadCreateAction.default = ThreadCreateAction;
module.exports = ThreadCreateAction;
