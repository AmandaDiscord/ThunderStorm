/**
 * I'm sorry for being lazy, discord.js
 */
/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
declare class MessageEmbed {
    /**
     * The type of this embed, either:
     * * `rich` - a rich embed
     * * `image` - an image embed
     * * `video` - a video embed
     * * `gifv` - a gifv embed
     * * `article` - an article embed
     * * `link` - a link embed
     */
    type: string;
    /**
     * The title of this embed
     */
    title: string | null;
    /**
     * The description of this embed
     */
    description: string | null;
    /**
     * The URL of this embed
     */
    url: string | null;
    /**
     * The color of this embed
     */
    color: number;
    /**
     * The timestamp of this embed
     */
    timestamp: number | null;
    fields: Array<import("../Types").EmbedField>;
    /**
     * The thumbnail of this embed (if there is one)
     */
    thumbnail: import("../Types").MessageEmbedThumbnail | null;
    /**
         * The image of this embed, if there is one
         */
    image: import("../Types").MessageEmbedImage | null;
    /**
     * The author of this embed (if there is one)
     */
    author: import("../Types").MessageEmbedAuthor | null;
    /**
     * The provider of this embed (if there is one)
     */
    provider: import("../Types").MessageEmbedProvider | null;
    /**
     * The footer of this embed
     */
    footer: import("../Types").MessageEmbedFooter | null;
    /**
     * The files of this embed
     */
    files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>;
    video: import("../Types").MessageEmbedVideo | null;
    /**
     * @param data MessageEmbed to clone or raw embed data
     */
    constructor(data?: import("@amanda/discordtypings").EmbedData, skipValidation?: boolean);
    private setup;
    /**
     * The date displayed on this embed
     */
    get createdAt(): Date | null;
    /**
     * The hexadecimal version of the embed color, with a leading hash
     */
    get hexColor(): string | null;
    /**
     * The accumulated length for the embed title, description, fields and footer text
     */
    get length(): number;
    /**
     * Adds a field to the embed (max 25).
     * @param name The name of this field
     * @param value The value of this field
     * @param inline If this field will be displayed inline
     */
    addField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline?: boolean): this;
    /**
     * Adds fields to the embed (max 25).
     * @param fields The fields to add
     */
    addFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this;
    /**
     * Removes, replaces, and inserts fields in the embed (max 25).
     * @param index The index to start at
     * @param deleteCount The number of fields to remove
     * @param fields The replacing field objects
     */
    spliceFields(index: number, deleteCount: number, ...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this;
    /**
     * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
     * setting an embed image or author/footer icons. Multiple files can be attached.
     * @param files Files to attach
     */
    attachFiles(files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>): this;
    /**
     * Sets the author of this embed.
     * @param name The name of the author
     * @param iconURL The icon URL of the author
     * @param url The URL of the author
     */
    setAuthor(name: import("../Types").StringResolvable, iconURL?: string, url?: string): this;
    /**
     * Sets the color of this embed.
     * @param color The color of the embed
     */
    setColor(color: import("../Types").ColorResolvable): this;
    /**
     * Sets the description of this embed.
     * @param description The description
     */
    setDescription(description: import("../Types").StringResolvable): this;
    /**
     * Sets the footer of this embed.
     * @param text The text of the footer
     * @param iconURL The icon URL of the footer
     */
    setFooter(text: import("../Types").StringResolvable, iconURL?: string): this;
    /**
     * Sets the image of this embed.
     * @param url The URL of the image
     */
    setImage(url: string): this;
    /**
     * Sets the thumbnail of this embed.
     * @param url The URL of the thumbnail
     */
    setThumbnail(url: string): this;
    /**
     * Sets the timestamp of this embed.
     * @param timestamp The timestamp or date
     */
    setTimestamp(timestamp?: Date | number): this;
    /**
     * Sets the title of this embed.
     * @param title The title
     */
    setTitle(title: import("../Types").StringResolvable): this;
    /**
     * Sets the URL of this embed.
     * @param url The URL
     */
    setURL(url: string): this;
    /**
     * Transforms the embed to a plain object.
     * @returns The raw data of this embed
     */
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
    /**
     * Normalizes field input and resolves strings.
     * @param name The name of the field
     * @param value The value of the field
     * @param inline Set the field to display inline
     */
    static normalizeField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline?: boolean): import("../Types").EmbedField;
    /**
     * Normalizes field input and resolves strings.
     * @param fields Fields to normalize
     */
    static normalizeFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): import("../Types").EmbedField[];
}
export = MessageEmbed;
