import Collection from "../util/Collection";
import SnowflakeUtil from "../util/SnowflakeUtil";

import Base from "./Base";
import TeamMember from "./TeamMember";

class Team extends Base {
	public name!: string;
	public icon: string | null = null;
	public ownerId!: string;
	public members: Collection<string, TeamMember> = new Collection();

	public constructor(client: import("../client/Client"), data: import("discord-typings").TeamData) {
		super(client);

		if (data) this._patch(data);
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.Id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get owner() {
		return this.ownerId ? this.members.get(this.ownerId) : null;
	}

	public iconURL(options: import("../Types").ImageURLOptions = { size: 128, format: "png" }) {
		if (!this.icon) return null;
		return this.client.rest.cdn.TeamIcon(this.Id, this.icon, options);
	}

	public toString() {
		return this.name || "Team";
	}

	public toJSON() {
		return {
			id: this.Id,
			icon: this.icon,
			name: this.name,
			owner_user_id: this.ownerId,
			members: [...this.members.values()].map(member => member.toJSON())
		};
	}

	public _patch(data: import("discord-typings").TeamData) {
		if (data.id) this.Id = data.id;
		if (!this.name || data.name !== undefined) this.name = data.name || "";
		if (!this.icon || data.icon !== undefined) this.icon = data.icon || null;
		if (data.owner_user_id !== undefined) this.ownerId = data.owner_user_id;
		if (data.members && Array.isArray(data.members)) {
			this.members.clear();
			for (const member of data.members) this.members.set(member.user.id, new TeamMember(this, member));
		}

		super._patch(data);
	}
}

export = Team;
