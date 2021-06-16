import Action from "./Action";
declare class PresenceUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").PresenceUpdateData): void;
}
export = PresenceUpdateAction;
