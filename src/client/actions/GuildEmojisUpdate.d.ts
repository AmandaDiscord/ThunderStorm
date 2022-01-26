import Action from "./Action";
declare class GuildEmojisUpdateAction extends Action {
    static default: typeof GuildEmojisUpdateAction;
    handle(data: import("discord-typings").GuildEmojisUpdateData): void;
}
export = GuildEmojisUpdateAction;
