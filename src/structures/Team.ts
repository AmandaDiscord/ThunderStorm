import Constants from "../Constants";

import Collection from "./Util/Collection";

import Base from "./Base";
import TeamMember from "./TeamMember";

class Team extends Base {
	public name: string | null = null;
	public icon: string | null = null;
	public ownerID!: string;
	public members: Collection<string, TeamMember> = new Collection();

	public constructor(data: import("@amanda/discordtypings").TeamData, client: import("./Client")) {
		super(data, client);

		this._patch(data);
	}

	public get owner() {
		return this.ownerID ? this.members.get(this.ownerID) : null;
	}

	public iconURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.icon) return null;
		return `${Constants.BASE_CDN_URL}/team-icons/${this.id}/${this.icon}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
	}

	public toString() {
		return this.name || "Team";
	}

	public toJSON() {
		return {
			id: this.id,
			icon: this.icon,
			name: this.name,
			owner_user_id: this.ownerID,
			members: [...this.members.values()].map(member => member.toJSON())
		};
	}

	public _patch(data: import("@amanda/discordtypings").TeamData) {
		// @ts-ignore Discord.js docs name even though the typings doesn't declare a name???
		if (!this.name || data.name !== undefined) this.name = data.name || null;
		if (!this.icon || data.icon !== undefined) this.icon = data.icon || null;
		if (data.owner_user_id !== undefined) this.ownerID = data.owner_user_id;
		if (data.members && Array.isArray(data.members)) {
			this.members.clear();
			for (const member of data.members) this.members.set(member.user.id, new TeamMember(this, member));
		}

		super._patch(data);
	}
}

export = Team;
