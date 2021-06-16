import STEndpoints from "snowtransfer/dist/src/Endpoints";

import Base from "./Base";
import { StickerFormatTypes, StickerTypes } from "../util/Constants";
import SnowflakeUtil from "../util/SnowflakeUtil";

class Sticker extends Base {
	public asset: string;
	public description: string;
	public format: import("../Types").StickerFormatType;
	public name: string;
	public packID: string | null;
	public tags: Array<string>;
	public type: import("../Types").StickerType;
	public available: boolean | null;
	public guildID: string | null;
	public user: import("./User") | null;
	public sortValue: number | null;

	constructor(client: import("../client/Client"), sticker: import("@amanda/discordtypings").StickerData) {
		super(client);

		const User: typeof import("./user") = require("./User");

		this.id = sticker.id;
		this.asset = sticker.asset as string;
		this.description = sticker.description;
		this.format = StickerFormatTypes[sticker.format_type];
		this.name = sticker.name;
		this.packID = sticker.pack_id || null;
		this.tags = sticker.tags?.split(", ") ?? [];
		// @ts-ignore
		this.type = StickerTypes[sticker.type];
		// @ts-ignore
		this.available = sticker.available ?? null;
		// @ts-ignore
		this.guildID = sticker.guild_id ?? null;
		// @ts-ignore
		this.user = sticker.user ? new User(this.client, sticker.user) : null;
		// @ts-ignore
		this.sortValue = sticker.sort_value ?? null;
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
