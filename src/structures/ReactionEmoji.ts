import Constants from "../Constants";

import SnowflakeUtil from "./Util/SnowflakeUtil";

class ReactionEmoji {
	public client: import("./Client");
	public reaction: import("./MessageReaction");
	public name: string;
	public id: string | null;
	public animated: boolean;

	public constructor(reaction: import("./MessageReaction"), emoji: { name: string; id: string | null; animated?: boolean }) {
		this.client = reaction.message.client;
		this.reaction = reaction;
		this.name = emoji.name;
		this.id = emoji.id;
		this.animated = emoji.animated || false;
	}

	public get createdTimestamp() {
		if (!this.id) return null;
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		if (!this.id) return null;
		return new Date(this.createdTimestamp as number);
	}

	public get url() {
		if (!this.id) return null;
		return `${Constants.BASE_CDN_URL}/emojis/${this.id}.${this.animated ? "gif" : "png"}`;
	}

	public get identifier() {
		if (this.id) return `${this.name}:${this.id}`;
		return encodeURIComponent(this.name);
	}

	public toJSON() {
		return {
			id: this.id,
			name: this.name,
			animated: this.animated
		};
	}

	public toString() {
		if (!this.id) return this.name;
		return `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`;
	}
}

export = ReactionEmoji;
