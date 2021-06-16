import Action from "./Action";
declare class UserUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").UserData): {
        old: null;
        updated: import("../../structures/User");
    };
}
export = UserUpdateAction;
