import STEndpoints from "snowtransfer/dist/Endpoints";

import Base from "./Base";
import { StickerFormatTypes } from "../util/Constants";
import SnowflakeUtil from "../util/SnowflakeUtil";

class Sticker extends Base {
	public format: import("../Types").StickerFormatType;
	public name: string;

	constructor(client: import("../client/Client"), sticker: import("discord-typings").StickerItemData) {
		super(client);

		this.id = sticker.id;
		this.format = StickerFormatTypes[sticker.format_type];
		this.name = sticker.name;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get url() {
		return `${STEndpoints.CDN_URL}/stickers/${this.id}.${this.format === "LOTTIE" ? "json" : "png"}`;
	}
}

export = Sticker;
