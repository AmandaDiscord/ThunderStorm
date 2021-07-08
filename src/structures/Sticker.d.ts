import Base from "./Base";
declare class Sticker extends Base {
    format: import("../Types").StickerFormatType;
    name: string;
    constructor(client: import("../client/Client"), sticker: import("@amanda/discordtypings").StickerData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get url(): string;
}
export = Sticker;
