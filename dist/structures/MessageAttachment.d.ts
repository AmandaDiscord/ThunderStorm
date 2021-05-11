/// <reference types="node" />
/**
 * Represents an attachment in a message.
 */
declare class MessageAttachment {
    attachment: string | Buffer | import("stream").Stream;
    /**
     * The name of this attachment
     */
    name: string | null;
    /**
     * The ID of this attachment
     */
    id: string;
    /**
     * The size of this attachment in bytes
     */
    size: number;
    /**
     * The URL to this attachment
     */
    url: string;
    /**
     * The Proxy URL to this attachment
     */
    proxyURL: string;
    /**
     * The height of this attachment (if an image or video)
     */
    height: number | null;
    /**
     * The width of this attachment (if an image or video)
     */
    width: number | null;
    /**
     * @param attachment The file
     * @param name The name of the file, if any
     * @param data Extra data
     */
    constructor(attachment: import("../Types").BufferResolvable | import("stream").Stream, name?: string | null, data?: import("@amanda/discordtypings").AttachmentData);
    /**
     * Sets the file of this attachment.
     * @param attachment The file
     * @param name The name of the file, if any
     * @returns This attachment
     */
    setFile(attachment: import("../Types").BufferResolvable | import("stream").Stream, name?: string | null): this;
    /**
     * Sets the name of this attachment.
     * @param name The name of the file
     * @returns This attachment
     */
    setName(name: string): this;
    _patch(data: import("@amanda/discordtypings").AttachmentData): void;
    /**
     * Whether or not this attachment has been marked as a spoiler
     */
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
