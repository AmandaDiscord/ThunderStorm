export declare function isObject(d: any): boolean;
export declare function flatten(obj: any, ...props: Array<{
    [s: string]: boolean | string;
}>): any;
export declare function basename(path: string, ext?: string): string;
export declare function resolveColor(color: import("../../Types").ColorResolvable | undefined): number;
export declare function resolveString(data: import("../../Types").StringResolvable): string;
export declare function cloneObject<T>(obj: T): T;
export declare function binaryToID(num: string): string;
export declare function idToBinary(num: string): string;
export declare const SnowflakeUtil: {
    generate(timestamp?: number | Date): string;
    deconstruct(snowflake: string): {
        timestamp: number;
        workerID: number;
        processID: number;
        increment: number;
        binary: string;
    };
};
export declare function escapeMarkdown(text: string, { codeBlock, inlineCode, bold, italic, underline, strikethrough, spoiler, codeBlockContent, inlineCodeContent }?: {
    codeBlock?: boolean | undefined;
    inlineCode?: boolean | undefined;
    bold?: boolean | undefined;
    italic?: boolean | undefined;
    underline?: boolean | undefined;
    strikethrough?: boolean | undefined;
    spoiler?: boolean | undefined;
    codeBlockContent?: boolean | undefined;
    inlineCodeContent?: boolean | undefined;
}): string;
export declare function escapeCodeBlock(text: string): string;
export declare function escapeInlineCode(text: string): string;
export declare function escapeItalic(text: string): string;
export declare function escapeBold(text: string): string;
export declare function escapeUnderline(text: string): string;
export declare function escapeStrikethrough(text: string): string;
export declare function escapeSpoiler(text: string): string;
export declare function parseEmoji(text: string): {
    animated: boolean;
    name: string;
    id: string | null;
} | null;
declare const _default: {
    isObject: typeof isObject;
    flatten: typeof flatten;
    basename: typeof basename;
    resolveColor: typeof resolveColor;
    resolveString: typeof resolveString;
    cloneObject: typeof cloneObject;
    SnowflakeUtil: {
        generate(timestamp?: number | Date): string;
        deconstruct(snowflake: string): {
            timestamp: number;
            workerID: number;
            processID: number;
            increment: number;
            binary: string;
        };
    };
    escapeMarkdown: typeof escapeMarkdown;
    escapeCodeBlock: typeof escapeCodeBlock;
    escapeInlineCode: typeof escapeInlineCode;
    escapeItalic: typeof escapeItalic;
    escapeBold: typeof escapeBold;
    escapeUnderline: typeof escapeUnderline;
    escapeStrikethrough: typeof escapeStrikethrough;
    escapeSpoiler: typeof escapeSpoiler;
    parseEmoji: typeof parseEmoji;
};
export default _default;
