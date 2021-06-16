import APIMessage from "../APIMessage";
declare class InteractionResponses {
    deferred?: boolean;
    replied?: boolean;
    client: import("../../client/Client");
    id: string;
    token: string;
    webhook: import("../InteractionWebhook");
    defer({ ephemeral }?: import("../../Types").InteractionDeferOptions): Promise<void>;
    reply(options: string | APIMessage | import("../../Types").InteractionReplyOptions): Promise<void>;
    fetchReply(): Promise<import("../Message")>;
    editReply(options: string | APIMessage | import("../../Types").WebhookEditMessageOptions): Promise<import("../Message")>;
    deleteReply(): Promise<void>;
    followUp(options: string | APIMessage | import("../../Types").InteractionReplyOptions): Promise<import("../Message")>;
    deferUpdate(): Promise<void>;
    update(options: string | APIMessage | import("../../Types").WebhookEditMessageOptions): Promise<void>;
    static applyToClass(structure: any, ignore?: Array<string>): void;
}
export = InteractionResponses;
