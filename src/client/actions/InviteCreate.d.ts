import Action from "./Action";
declare class InviteCreateAction extends Action {
    static readonly default: typeof InviteCreateAction;
    handle(data: import("discord-typings").InviteCreateData): {
        invite: import("../../structures/Invite");
    };
}
export = InviteCreateAction;
