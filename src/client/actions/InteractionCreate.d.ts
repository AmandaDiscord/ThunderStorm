import Action from "./Action";
declare class InteractionCreateAction extends Action {
    static readonly default: typeof InteractionCreateAction;
    handle(data: import("discord-typings").InteractionData): void;
}
export = InteractionCreateAction;
