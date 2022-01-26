import Action from "./Action";
declare class GuildMemberUpdateAction extends Action {
    static readonly default: typeof GuildMemberUpdateAction;
    handle(data: import("discord-typings").MemberData & {
        guild_id: string;
        user: import("discord-typings").UserData;
    }): void;
}
export = GuildMemberUpdateAction;
