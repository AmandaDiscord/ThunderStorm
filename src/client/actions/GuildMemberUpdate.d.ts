import Action from "./Action";
declare class GuildMemberUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").MemberData & {
        guild_id: string;
        user: import("@amanda/discordtypings").UserData;
    }): void;
}
export = GuildMemberUpdateAction;
