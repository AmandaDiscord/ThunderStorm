import Base from "./Base";
declare class Sticker extends Base {
    asset: string;
    description: string;
    format: import("../Types").StickerFormatType;
    name: string;
    packID: string | null;
    tags: Array<string>;
    type: import("../Types").StickerType;
    available: boolean | null;
    guildID: string | null;
    user: import("./User") | null;
    sortValue: number | null;
    constructor(client: import("../client/Client"), sticker: import("@amanda/discordtypings").StickerData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get url(): string;
}
export = Sticker;
