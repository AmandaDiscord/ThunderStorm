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
    constructor(attachment: import("../types").BufferResolvable | import("stream").Stream, name?: string | null, data?: any);
    setFile(attachment: import("../types").BufferResolvable | import("stream").Stream, name?: string | null): this;
    setName(name: string): this;
    _patch(data: any): void;
    get spoiler(): boolean;
    toJSON(): any;
}
export = MessageAttachment;
