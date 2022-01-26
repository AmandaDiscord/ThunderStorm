interface MessagePayloadConstructor {
    new (target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions): MessagePayload;
    readonly prototype: MessagePayload;
    readonly [Symbol.species]: MessagePayloadConstructor;
}
declare class MessagePayload {
    ["constructor"]: typeof MessagePayload;
    readonly [Symbol.species]: MessagePayloadConstructor;
    target: import("../Types").MessageTarget;
    options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions;
    data: any | null;
    files: Array<any> | null;
    static readonly default: typeof MessagePayload;
    constructor(target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions);
    get isWebhook(): boolean;
    get isUser(): boolean;
    get isMessage(): boolean;
    get isInteraction(): boolean;
    makeContent(): string | string[] | undefined;
    resolveData(): this;
    resolveFiles(): Promise<this>;
    split(): MessagePayload[];
    static resolveFile(fileLike: import("../Types").BufferResolvable | import("stream").Stream | import("../Types").FileOptions | import("./MessageAttachment")): Promise<{
        attachment: import("./MessageAttachment") | import("stream").Stream | import("../Types").BufferResolvable | import("../Types").FileOptions;
        name: string;
        file: import("stream").Stream | Buffer;
    }>;
    static create(target: import("../Types").MessageTarget, options?: string | null | import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions, extra?: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions): MessagePayload;
}
export = MessagePayload;
