import Action from "./Action";
declare class GuildMemberRemoveAction extends Action {
    static readonly default: typeof GuildMemberRemoveAction;
    handle(data: import("discord-typings").GuildMemberRemoveData): {
        guild: import("../../structures/Partial/PartialGuild");
        member: import("../../structures/GuildMember");
    };
}
export = GuildMemberRemoveAction;
