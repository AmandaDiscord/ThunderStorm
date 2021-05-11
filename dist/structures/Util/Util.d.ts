export declare function isObject(d: any): boolean;
/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param props Specific properties to include/exclude.
 */
export declare function flatten(obj: any, ...props: Array<{
    [s: string]: boolean | string;
}>): any;
/**
 * Alternative to Node's `path.basename`, removing query string after the extension if it exists.
 * @param path Path to get the basename of
 * @param ext File extension to remove
 * @returns Basename of the path
 */
export declare function basename(path: string, ext?: string): string;
/**
 * Resolves a ColorResolvable into a color number.
 * @param color Color to resolve
 * @returns A color
 */
export declare function resolveColor(color: import("../../Types").ColorResolvable | undefined): number;
/**
 * Resolves a StringResolvable to a string.
 * @param data The string resolvable to resolve
 */
export declare function resolveString(data: import("../../Types").StringResolvable): string;
/**
 * Shallow-copies an object with its class/prototype intact.
 * @param obj Object to clone
 */
export declare function cloneObject<T>(obj: T): T;
/**
 * Transforms a snowflake from a bit string to a decimal string.
 * @param num Bit string to be transformed
 */
export declare function binaryToID(num: string): string;
/**
 * Transforms a snowflake from a decimal string to a bit string.
 * @param num Snowflake to be transformed
 */
export declare function idToBinary(num: string): string;
/**
 * Escapes any Discord-flavour markdown in a string.
 * @param text Content to escape
 * @param options What types of markdown to escape
 */
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
/**
 * Escapes code block markdown in a string.
 * @param text Content to escape
 */
export declare function escapeCodeBlock(text: string): string;
/**
 * Escapes inline code markdown in a string.
 * @param text Content to escape
 */
export declare function escapeInlineCode(text: string): string;
/**
 * Escapes italic markdown in a string.
 * @param text Content to escape
 */
export declare function escapeItalic(text: string): string;
/**
 * Escapes bold markdown in a string.
 * @param text Content to escape
 */
export declare function escapeBold(text: string): string;
/**
 * Escapes underline markdown in a string.
 * @param text Content to escape
 */
export declare function escapeUnderline(text: string): string;
/**
 * Escapes strikethrough markdown in a string.
 * @param text Content to escape
 */
export declare function escapeStrikethrough(text: string): string;
/**
 * Escapes spoiler markdown in a string.
 * @param text Content to escape
 */
export declare function escapeSpoiler(text: string): string;
/**
 * Parses emoji info out of a string. The string must be one of:
 * * A UTF-8 emoji (no ID)
 * * A URL-encoded UTF-8 emoji (no ID)
 * * A Discord custom emoji (`<:name:id>` or `<a:name:id>`)
 * @param text Emoji string to parse
 * @returns Object with `animated`, `name`, and `id` properties
 */
export declare function parseEmoji(text: string): {
    animated: boolean;
    name: string;
    id: string | null;
} | null;
export declare function cleanContent(str: string, message: import("../Message")): string;
export declare function removeMentions(str: string): string;
declare const _default: {
    isObject: typeof isObject;
    flatten: typeof flatten;
    basename: typeof basename;
    resolveColor: typeof resolveColor;
    resolveString: typeof resolveString;
    cloneObject: typeof cloneObject;
    binaryToID: typeof binaryToID;
    idToBinary: typeof idToBinary;
    escapeMarkdown: typeof escapeMarkdown;
    escapeCodeBlock: typeof escapeCodeBlock;
    escapeInlineCode: typeof escapeInlineCode;
    escapeItalic: typeof escapeItalic;
    escapeBold: typeof escapeBold;
    escapeUnderline: typeof escapeUnderline;
    escapeStrikethrough: typeof escapeStrikethrough;
    escapeSpoiler: typeof escapeSpoiler;
    parseEmoji: typeof parseEmoji;
    cleanContent: typeof cleanContent;
    removeMentions: typeof removeMentions;
};
export default _default;
