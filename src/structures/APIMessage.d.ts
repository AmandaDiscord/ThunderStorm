/// <reference types="node" />
interface APIMessageConstructor {
    new (target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions): APIMessage;
    readonly prototype: APIMessage;
    readonly [Symbol.species]: APIMessageConstructor;
}
declare class APIMessage {
    ["constructor"]: typeof APIMessage;
    readonly [Symbol.species]: APIMessageConstructor;
    target: import("../Types").MessageTarget;
    options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions;
    data: any | null;
    files: Array<any> | null;
    constructor(target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions);
    get isWebhook(): boolean;
    get isUser(): boolean;
    get isMessage(): boolean;
    get isInteraction(): boolean;
    makeContent(): string | string[] | undefined;
    resolveData(): this;
    resolveFiles(): Promise<this>;
    split(): APIMessage[];
    static resolveFile(fileLike: import("../Types").BufferResolvable | import("stream").Stream | import("../Types").FileOptions | import("./MessageAttachment")): Promise<{
        attachment: string | import("./MessageAttachment") | Buffer | import("../Types").FileOptions | import("stream").Stream;
        name: string;
        file: Buffer | import("stream").Stream;
    }>;
    static create(target: import("../Types").MessageTarget, options?: string | null | import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions, extra?: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions): APIMessage;
}
export = APIMessage;
