import SnowflakeUtil from "../../util/SnowflakeUtil";
import Base from "../Base";

abstract class Application extends Base {
	public name!: string | null;
	public description!: string | null;
	public icon!: string | null;
	public cover!: string | null;

	public constructor(client: import("../../client/Client"), data: import("discord-typings").ApplicationData) {
		super(client);
		this._patch(data);
	}

	public _patch(data: import("discord-typings").ApplicationData) {
		this.id = data.id;
		this.name = data.name ?? this.name ?? null;
		this.description = data.description ?? this.description ?? null;
		this.icon = data.icon ?? this.icon ?? null;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public iconURL(options: import("../../Types").ImageURLOptions = {}) {
		if (!this.icon) return null;
		return this.client.rest.cdn.AppIcon(this.id, this.icon, options);
	}

	public coverURL(options: import("../../Types").ImageURLOptions = {}) {
		if (!this.cover) return null;
		return this.client.rest.cdn.AppIcon(this.id, this.cover, options);
	}

	public fetchAssets() {
		return Promise.resolve([]);
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
		return super.toJSON({ createdTimestamp: true });
	}
}

export = Application;
