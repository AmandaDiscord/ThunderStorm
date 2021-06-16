import Action from "./Action";
declare class TypingStart extends Action {
    handle(data: import("@amanda/discordtypings").TypingStartData): void;
    tooLate(channel: any, user: any): void;
}
export = TypingStart;
