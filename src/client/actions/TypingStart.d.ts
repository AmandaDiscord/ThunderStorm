import Action from "./Action";
declare class TypingStart extends Action {
    static readonly default: typeof TypingStart;
    handle(data: import("discord-typings").TypingStartData): void;
    tooLate(channel: any, user: any): void;
}
export = TypingStart;
