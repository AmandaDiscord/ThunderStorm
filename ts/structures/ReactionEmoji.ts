import SnowflakeUtil from "../util/SnowflakeUtil";

class ReactionEmoji {
	public client: import("../client/Client");
	public reaction: import("./MessageReaction");
	public name: string;
	public Id: string | null;
	public animated: boolean;

	public constructor(reaction: import("./MessageReaction"), emoji: { name: string; id: string | null; animated?: boolean }) {
		this.client = reaction.message.client;
		this.reaction = reaction;
		this.name = emoji.name;
		this.Id = emoji.id;
		this.animated = emoji.animated || false;
	}

	public get createdTimestamp() {
		if (!this.Id) return null;
		return SnowflakeUtil.deconstruct(this.Id).timestamp;
	}

	public get createdAt() {
		if (!this.Id) return null;
		return new Date(this.createdTimestamp as number);
	}

	public get url() {
		if (!this.Id) return null;
		return this.client.rest.cdn.Emoji(this.Id, this.animated ? "gif" : "png");
	}

	public get identifier() {
		if (this.Id) return `${this.name}:${this.Id}`;
		return encodeURIComponent(this.name);
	}

	public toJSON() {
		return {
			id: this.Id,
			name: this.name,
			animated: this.animated
		};
	}

	public toString() {
		if (!this.Id) return this.name;
		return `<${this.animated ? "a" : ""}:${this.name}:${this.Id}>`;
	}
}

export = ReactionEmoji;
