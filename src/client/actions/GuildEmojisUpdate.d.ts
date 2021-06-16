import Action from "./Action";
declare class GuildEmojisUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").GuildEmojisUpdateData): void;
}
export = GuildEmojisUpdateAction;
