import MessagePayload from "../MessagePayload";
declare class InteractionResponses {
    deferred?: boolean;
    replied?: boolean;
    client: import("../../client/Client");
    id: string;
    token: string;
    webhook: import("../InteractionWebhook");
    defer({ ephemeral }?: import("../../Types").InteractionDeferOptions): Promise<void>;
    reply(options: string | MessagePayload | import("../../Types").InteractionReplyOptions): Promise<void>;
    fetchReply(): Promise<import("../Message")>;
    editReply(options: string | MessagePayload | import("../../Types").WebhookEditMessageOptions): Promise<import("../Message")>;
    deleteReply(): Promise<void>;
    followUp(options: string | MessagePayload | import("../../Types").InteractionReplyOptions): Promise<import("../Message")>;
    deferUpdate(): Promise<void>;
    update(options: string | MessagePayload | import("../../Types").WebhookEditMessageOptions): Promise<void>;
    static applyToClass(structure: any, ignore?: Array<string>): void;
}
export = InteractionResponses;
