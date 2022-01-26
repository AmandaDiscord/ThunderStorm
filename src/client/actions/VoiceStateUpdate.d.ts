import Action from "./Action";
declare class VoiceStateUpdate extends Action {
    static readonly default: typeof VoiceStateUpdate;
    handle(data: import("discord-typings").VoiceStateData): void;
}
export = VoiceStateUpdate;
