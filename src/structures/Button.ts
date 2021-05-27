class Button {
	public client: import("./Client");
	public style: "primary" | "secondary" | "success" | "danger" | "link" = "primary";
	public label: string | null = null;
	public emoji: { id: string | null; name: string; animated: boolean; } | null = null;
	public identifier: string | null = null;
	public url: string | null = null;
	public disabled?: boolean = false;

	public constructor(data: import("@amanda/discordtypings").ButtonData, client: import("./Client")) {
		this.client = client;

		this._patch(data);
	}

	public get id() {
		return this.url ? this.url : this.identifier as string;
	}

	public setStyle(style: "primary" | "secondary" | "success" | "danger" | "link") {
		this.style = style;
		return this;
	}

	public toJSON() {
		const value: import("@amanda/discordtypings").ButtonData = {
			type: 2 as const,
			style: this.style === "primary" ? 1 :
			this.style === "secondary" ? 2 :
			this.style === "success" ? 3 :
			this.style === "danger" ? 4 :
			this.style === "link" ? 5 : 1
		};
		if (this.label) value["label"] = this.label;
		if (this.emoji) value["emoji"] = this.emoji;
		if (this.identifier && !this.url) value["custom_id"] = this.identifier;
		if (this.url) value["url"] = this.url;
		if (this.disabled !== undefined) value["disabled"] = this.disabled;
		return value;
	}

	public _patch(data: import("@amanda/discordtypings").MessageComponentData) {
		if (data.style) {
			this.style = data.style === 1 ? "primary" :
				data.style === 2 ? "secondary" :
				data.style === 3 ? "success" :
				data.style === 4 ? "danger" :
				data.style === 5 ? "link" : "primary";
		}
		if (data.label) this.label = data.label;
		if (data.emoji) this.emoji = { id: data.emoji.id || null, name: data.emoji.name, animated: data.emoji.animated || false };
		if (data.custom_id) this.identifier = data.custom_id;
		if (data.url) this.url = data.url;
		if (data.disabled !== undefined) this.disabled = data.disabled;
	}
}

export = Button;
