import Action from "./Action";
declare class UserUpdateAction extends Action {
    static readonly default: typeof UserUpdateAction;
    handle(data: import("discord-typings").UserData): {
        old: null;
        updated: import("../../structures/User");
    };
}
export = UserUpdateAction;
