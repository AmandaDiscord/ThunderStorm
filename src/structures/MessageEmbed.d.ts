declare class MessageEmbed {
    type: string;
    title: string | null;
    description: string | null;
    url: string | null;
    color: number;
    timestamp: number | null;
    fields: Array<import("../Types").EmbedField>;
    thumbnail: import("../Types").MessageEmbedThumbnail | null;
    image: import("../Types").MessageEmbedImage | null;
    author: import("../Types").MessageEmbedAuthor | null;
    provider: import("../Types").MessageEmbedProvider | null;
    footer: import("../Types").MessageEmbedFooter | null;
    files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>;
    video: import("../Types").MessageEmbedVideo | null;
    static readonly default: typeof MessageEmbed;
    constructor(data?: import("discord-typings").EmbedData, skipValidation?: boolean);
    private setup;
    get createdAt(): Date | null;
    get hexColor(): string | null;
    get length(): number;
    addField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline?: boolean): this;
    addFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this;
    spliceFields(index: number, deleteCount: number, ...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this;
    attachFiles(files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>): this;
    setAuthor(name: import("../Types").StringResolvable, iconURL?: string, url?: string): this;
    setColor(color: import("../Types").ColorResolvable): this;
    setDescription(description: import("../Types").StringResolvable): this;
    setFooter(text: import("../Types").StringResolvable, iconURL?: string): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    setTimestamp(timestamp?: Date | number): this;
    setTitle(title: import("../Types").StringResolvable): this;
    setURL(url: string): this;
    toJSON(): {
        title: string | null;
        type: string;
        description: string | null;
        url: string | null;
        timestamp: Date | null;
        color: number;
        fields: import("../Types").EmbedField[];
        thumbnail: import("../Types").MessageEmbedThumbnail | null;
        image: import("../Types").MessageEmbedImage | null;
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
    static normalizeField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline?: boolean): import("../Types").EmbedField;
    static normalizeFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): import("../Types").EmbedField[];
}
export = MessageEmbed;
