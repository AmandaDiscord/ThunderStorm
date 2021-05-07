import Constants from "../Constants";

import Base from "./Base";

/**
 * @abstract
 */
class Application extends Base {
	public description!: string;
	public icon: string | null = null;
	public cover: string | null = null;
	public name!: string;

	public constructor(data: import("@amanda/discordtypings").ApplicationData, client: import("./Client")) {
		super(data, client);

		this._patch(data);
	}

	public iconURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.icon) return null;
		return `${Constants.BASE_CDN_URL}/app-icons/${this.id}/${this.icon}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
	}

	public coverURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.cover) return null;
		return `${Constants.BASE_CDN_URL}/app-icons/${this.id}/${this.cover}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
	}

	public fetchAssets() {
		return Promise.resolve([]);
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
		const value: { id: string; description: string; icon: string | null; name: string; cover_image?: string } = {
			id: this.id,
			description: this.description,
			icon: this.icon,
			name: this.name
		};
		if (this.cover) value["cover_image"] = this.cover;
		return value;
	}

	public _patch(data: import("@amanda/discordtypings").ApplicationData) {
		if (data.description) this.description = data.description;
		if (data.icon !== undefined) this.icon = data.icon;
		if (data.name) this.name = data.name;

		super._patch(data);
	}
}

export = Application;
