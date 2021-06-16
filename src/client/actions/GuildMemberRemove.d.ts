import Action from "./Action";
declare class GuildMemberRemoveAction extends Action {
    handle(data: import("@amanda/discordtypings").GuildMemberRemoveData): {
        guild: import("../../structures/Partial/PartialGuild") | null;
        member: import("../../structures/GuildMember");
    };
}
export = GuildMemberRemoveAction;
