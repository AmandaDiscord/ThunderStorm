import Action from "./Action";
declare class VoiceStateUpdate extends Action {
    handle(data: import("@amanda/discordtypings").VoiceStateData): void;
}
export = VoiceStateUpdate;
