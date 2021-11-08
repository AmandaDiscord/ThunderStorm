import Base from "./Base";

import User from "./User";

class TeamMember extends Base {
	public team: import("./Team");
	public permissions: ["*"] = ["*"];
	public membershipState!: "INVITED" | "ACCEPTED";
	public user!: User;

	public constructor(team: import("./Team"), data: import("discord-typings").TeamMemberData) {
		super(team.client);

		this.team = team;

		if (data) this._patch(data);
	}

	public toString() {
		return this.user.toString();
	}

	public toJSON() {
		return {
			id: this.id,
			team_id: this.team.id,
			membership_state: this.membershipState === "INVITED" ? 1 : 2 as 1 | 2,
			permissions: this.permissions,
			user: this.user.toJSON()
		};
	}

	public _patch(data: import("discord-typings").TeamMemberData) {
		if (data.permissions) this.permissions = data.permissions;
		if (!this.membershipState || data.membership_state) this.membershipState = data.membership_state === 1 ? "INVITED" : "ACCEPTED";
		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(this.client, data.user);
			this.id = this.user.id;
		}
	}
}

export = TeamMember;
