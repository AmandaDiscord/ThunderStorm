/// <reference types="node" />
declare class MessageAttachment {
    attachment: string | Buffer | import("stream").Stream;
    name: string | null;
    id: string;
    size: number;
    url: string;
    proxyURL: string;
    height: number | null;
    width: number | null;
    constructor(attachment: import("../Types").BufferResolvable | import("stream").Stream, name?: string | null, data?: import("@amanda/discordtypings").AttachmentData);
    setFile(attachment: import("../Types").BufferResolvable | import("stream").Stream, name?: string | null): this;
    setName(name: string): this;
    _patch(data: import("@amanda/discordtypings").AttachmentData): void;
    get spoiler(): boolean;
    toJSON(): {
        id: string;
        size: number;
        url: string;
        proxy_url: string;
        height: number | null;
        width: number | null;
        name: string | null;
        attachment: string | Buffer | import("stream").Stream;
    };
}
export = MessageAttachment;
