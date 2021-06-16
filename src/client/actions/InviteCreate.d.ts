import Action from "./Action";
declare class InviteCreateAction extends Action {
    handle(data: import("@amanda/discordtypings").InviteCreateData): {
        invite: import("../../structures/Invite");
    };
}
export = InviteCreateAction;
