import Base from "./Base";

class Channel extends Base {
	public partial: false = false;
	public id!: string;
	public name!: string;
	public type: "category" | "dm" | "news" | "text" | "voice" | "stage" | "unknown" = "unknown";

	public constructor(data: import("@amanda/discordtypings").ChannelData, client: import("./Client")) {
		super(data, client);

		this._patch(data);
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			id: this.id,
			name: this.id
		};
	}

	public _patch(data: import("@amanda/discordtypings").ChannelData) {
		if (data.name) this.name = data.name;
		super._patch(data);
	}
}

export = Channel;
