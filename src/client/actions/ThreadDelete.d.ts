import Action from "./Action";
import ThreadTextChannel from "../../structures/ThreadTextChannel";
import ThreadNewsChannel from "../../structures/ThreadNewsChannel";
declare class ThreadDeleteAction extends Action {
    static readonly default: typeof ThreadDeleteAction;
    handle(data: import("discord-typings").ThreadChannelData): {
        thread: ThreadTextChannel | ThreadNewsChannel;
    };
}
export = ThreadDeleteAction;
