declare type FlattenIfArray<T> = T extends Array<infer R> ? R : T;
declare class Util {
    static readonly default: typeof Util;
    constructor();
    static flatten(obj: any, ...props: Array<{
        [s: string]: boolean | string;
    }>): any;
    static splitMessage(text: string, { maxLength, char, prepend, append }?: {
        maxLength?: number | undefined;
        char?: string | RegExp | undefined;
        prepend?: string | undefined;
        append?: string | undefined;
    }): string[];
    static escapeMarkdown(text: string, { codeBlock, inlineCode, bold, italic, underline, strikethrough, spoiler, codeBlockContent, inlineCodeContent }?: {
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
    static escapeCodeBlock(text: string): string;
    static escapeInlineCode(text: string): string;
    static escapeItalic(text: string): string;
    static escapeBold(text: string): string;
    static escapeUnderline(text: string): string;
    static escapeStrikethrough(text: string): string;
    static escapeSpoiler(text: string): string;
    static fetchRecommendedShards(token: string, guildsPerShard?: number): Promise<number>;
    static parseEmoji(text: string): {
        animated: boolean;
        name: string;
        id: string | null;
    } | null;
    static resolvePartialEmoji(emoji: import("../Types").EmojiIdentifierResolvable): {
        id: string | null;
        name?: string;
        animated?: boolean;
    } | null;
    static cloneObject<T>(obj: T): T;
    static mergeDefault<D extends Record<any, any>, T extends Record<any, any>>(def: D, given?: T): D | D & T;
    static makeError(obj: {
        name: string;
        message: string;
        stack: string;
    }): Error;
    static makePlainError(err: Error): {
        name: string;
        message: string;
        stack: string | undefined;
    };
    static moveElementInArray<T extends Array<any>>(array: T, element: FlattenIfArray<T>, newIndex: number, offset?: boolean): number;
    static verifyString(data: string, error?: ErrorConstructor, errorMessage?: string, allowEmpty?: boolean): string;
    static resolveColor(color: import("../Types").ColorResolvable | undefined): number;
    static discordSort<T extends import("@discordjs/collection").Collection<any, any>>(collection: T): import("@discordjs/collection").Collection<any, any>;
    static setPosition<T extends import("../structures/Channel") | import("../structures/ROle")>(item: T, position: number, relative: boolean, sorted: import("@discordjs/collection").Collection<string, T>, route: import("../internal").Route, reason?: string): Promise<T[]>;
    static basename(path: string, ext?: string): string;
    static removeMentions(str: string): string;
    static cleanContent(str: string, message: import("../structures/Message")): string;
    static cleanCodeBlockContent(text: string): string;
    static delayFor(ms: number): Promise<void>;
    static createChannelFromData(client: import("../client/Client"), data: import("../internal").ChannelDatas | {
        id: string;
        guild_id?: string;
        type: undefined;
    }): import("../structures/DMChannel") | import("../structures/TextChannel") | import("../structures/VoiceChannel") | import("../structures/CategoryChannel") | import("../structures/NewsChannel") | import("../structures/StageChannel") | import("../structures/Partial/PartialChannel") | import("../structures/Channel");
}
export = Util;
