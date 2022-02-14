import Action from "./Action";
import ThreadTextChannel from "../../structures/ThreadTextChannel";
import ThreadNewsChannel from "../../structures/ThreadNewsChannel";
declare class ThreadCreateAction extends Action {
    static readonly default: typeof ThreadCreateAction;
    handle(data: import("discord-typings").ThreadChannelData): {
        thread: ThreadTextChannel | ThreadNewsChannel;
    };
}
export = ThreadCreateAction;
