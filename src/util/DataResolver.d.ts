/// <reference types="node" />
import stream from "stream";
declare class DataResolver {
    static readonly default: typeof DataResolver;
    constructor();
    static resolveCode(data: string, regex: RegExp): string;
    static resolveInviteCode(data: string): string;
    static resolveImage(image?: import("../Types").BufferResolvable): Promise<string | null>;
    static resolveBase64(data: Buffer | string): string;
    static resolveFile(resource: Buffer | string | stream.Stream | import("../Types").FileOptions | import("../structures/MessageAttachment")): Promise<Buffer | stream.Stream>;
    static resolveFileAsBuffer(resource: import("../Types").BufferResolvable | stream.Stream): Promise<Buffer>;
}
export = DataResolver;
