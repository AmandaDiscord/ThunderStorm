import Action from "./Action";
declare class InviteDeleteAction extends Action {
    static readonly default: typeof InviteDeleteAction;
    handle(data: import("discord-typings").InviteDeleteData): {
        invite: import("../../structures/Invite");
    };
}
export = InviteDeleteAction;
