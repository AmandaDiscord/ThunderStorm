declare const Colors: {
    DEFAULT: number;
    WHITE: number;
    AQUA: number;
    GREEN: number;
    BLUE: number;
    YELLOW: number;
    PURPLE: number;
    LUMINOUS_VIVID_PINK: number;
    GOLD: number;
    ORANGE: number;
    RED: number;
    GREY: number;
    NAVY: number;
    DARK_AQUA: number;
    DARK_GREEN: number;
    DARK_BLUE: number;
    DARK_PURPLE: number;
    DARK_VIVID_PINK: number;
    DARK_GOLD: number;
    DARK_ORANGE: number;
    DARK_RED: number;
    DARK_GREY: number;
    DARKER_GREY: number;
    LIGHT_GREY: number;
    DARK_NAVY: number;
    BLURPLE: number;
    GREYPLE: number;
    DARK_BUT_NOT_BLACK: number;
    NOT_QUITE_BLACK: number;
    RANDOM: string;
};
declare type ColorResolvable = keyof typeof Colors | number | Array<number>;
interface EmbedField {
    name: string;
    value: string;
    inline: boolean;
}
interface FileOptions {
    attachment: import("../types").BufferResolvable;
    name?: string;
}
interface MessageEmbedThumbnail {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
}
interface MessageEmbedImage {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
}
interface MessageEmbedVideo {
    url: string;
    proxyURL: string;
    height: number;
    width: number;
}
interface MessageEmbedAuthor {
    name: string;
    url: string;
    iconURL: string;
    proxyIconURL: string;
}
interface MessageEmbedProvider {
    name: string;
    url: string;
}
interface MessageEmbedFooter {
    text: string;
    iconURL: string;
    proxyIconURL: string;
}
interface EmbedFieldData {
    name: import("../types").StringResolvable;
    value: import("../types").StringResolvable;
    inline?: boolean;
}
declare class MessageEmbed {
    type: string;
    title: string | null;
    description: string | null;
    url: string | null;
    color: number;
    timestamp: number | null;
    fields: Array<EmbedField>;
    thumbnail: MessageEmbedThumbnail | null;
    image: MessageEmbedImage | null;
    author: MessageEmbedAuthor | null;
    provider: MessageEmbedProvider | null;
    footer: MessageEmbedFooter | null;
    files: Array<FileOptions | string | import("./MessageAttachment")>;
    video: MessageEmbedVideo | null;
    constructor(data?: import("@amanda/discordtypings").EmbedData, skipValidation?: boolean);
    private setup;
    get createdAt(): Date | null;
    get hexColor(): string | null;
    get length(): number;
    addField(name: import("../types").StringResolvable, value: import("../types").StringResolvable, inline?: boolean): this;
    addFields(...fields: (EmbedFieldData | EmbedFieldData[])[]): this;
    spliceFields(index: number, deleteCount: number, ...fields: (EmbedFieldData | EmbedFieldData[])[]): this;
    attachFiles(files: Array<FileOptions | string | import("./MessageAttachment")>): this;
    setAuthor(name: import("../types").StringResolvable, iconURL: string, url: string): this;
    setColor(color: ColorResolvable): this;
    setDescription(description: import("../types").StringResolvable): this;
    setFooter(text: import("../types").StringResolvable, iconURL: string): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    setTimestamp(timestamp?: Date | number): this;
    setTitle(title: import("../types").StringResolvable): this;
    setURL(url: string): this;
    toJSON(): {
        title: string | null;
        type: string;
        description: string | null;
        url: string | null;
        timestamp: Date | null;
        color: number;
        fields: EmbedField[];
        thumbnail: MessageEmbedThumbnail | null;
        image: MessageEmbedImage | null;
        author: {
            name: string;
            url: string;
            icon_url: string;
        } | null;
        footer: {
            text: string;
            icon_url: string;
        } | null;
    };
    static normalizeField(name: import("../types").StringResolvable, value: import("../types").StringResolvable, inline?: boolean): EmbedField;
    static normalizeFields(...fields: (EmbedFieldData | EmbedFieldData[])[]): EmbedField[];
}
export = MessageEmbed;
