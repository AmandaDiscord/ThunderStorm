import SnowflakeUtil from "./Util/SnowflakeUtil";

class Base {
	public id!: string;
	public client: import("./Client");

	public constructor(data: { id: string }, client: import("./Client")) {
		this.client = client;

		this.id = data.id;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public toJSON() {
		return {
			id: this.id
		};
	}

	public _patch(data: { id: string }) {
		if (data.id) this.id = data.id;
	}
}

export = Base;
