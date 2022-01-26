import Base from "./Base";
declare class Sticker extends Base {
    format: import("../Types").StickerFormatType;
    name: string;
    static readonly default: typeof Sticker;
    constructor(client: import("../client/Client"), sticker: import("discord-typings").StickerItemData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get url(): string;
}
export = Sticker;
