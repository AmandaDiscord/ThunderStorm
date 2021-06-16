import Action from "./Action";
declare class InviteDeleteAction extends Action {
    handle(data: import("@amanda/discordtypings").InviteDeleteData): {
        invite: import("../../structures/Invite");
    };
}
export = InviteDeleteAction;
