import Action from "./Action";
declare class PresenceUpdateAction extends Action {
    static readonly default: typeof PresenceUpdateAction;
    handle(data: import("discord-typings").PresenceUpdateData): void;
}
export = PresenceUpdateAction;
