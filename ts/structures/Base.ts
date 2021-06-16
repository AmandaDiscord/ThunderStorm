import Util from "../util/Util";

abstract class Base {
	public client: import("../client/Client");
	public id!: string;

	public constructor(client: import("../client/Client")) {
		this.client = client;
	}

	public _clone(): this {
		return Object.assign(Object.create(this), this);
	}

	public _patch(data: any) {
		return data;
	}

	public _update(data: any): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}

	public toJSON(...props: Array<Record<keyof this, string | boolean>>) {
		return Util.flatten(this, ...props);
	}

	public valueOf() {
		return this.id;
	}
}

export = Base;
