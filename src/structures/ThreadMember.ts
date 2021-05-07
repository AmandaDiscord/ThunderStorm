import Base from "./Base";

class ThreadMember extends Base {
	public flags = 0;
	public threadID!: string;
	public thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel");
	public joinedAt!: Date;
	public joinedTimestamp!: number
	public user!: import("./Partial/PartialUser");

	public constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel"), data: import("@amanda/discordtypings").ThreadMemberData) {
		super({ id: data.user_id }, thread.client);
		this.thread = thread;

		this._patch(data);
	}

	public toJSON() {
		return {
			flags: this.flags,
			id: this.threadID,
			join_timestamp: this.joinedAt.toISOString(),
			user_id: this.user.id
		};
	}

	public _patch(data: import("@amanda/discordtypings").ThreadMemberData) {
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		if (data.flags !== undefined) this.flags = data.flags;
		if (!this.threadID || data.id) this.threadID = data.id || this.thread.id;
		if (data.join_timestamp) {
			this.joinedAt = new Date(data.join_timestamp);
			this.joinedTimestamp = this.joinedAt.getTime();
		}
		if (data.user_id) this.user = new PartialUser({ id: data.user_id }, this.client);
	}
}

export = ThreadMember;
