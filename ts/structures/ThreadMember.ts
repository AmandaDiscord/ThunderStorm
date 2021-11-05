import Base from "./Base";

class ThreadMember extends Base {
	public flags = 0;
	public threadId!: string;
	public thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel");
	public joinedAt!: Date;
	public joinedTimestamp!: number;
	public user!: import("./Partial/PartialUser");

	public constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel"), data: import("discord-typings").ThreadMemberData) {
		super(thread.client);
		this.thread = thread;

		if (data) this._patch(data);
	}

	public toJSON() {
		return {
			flags: this.flags,
			id: this.threadId,
			join_timestamp: this.joinedAt.toISOString(),
			user_id: this.user.Id
		};
	}

	public _patch(data: import("discord-typings").ThreadMemberData) {
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		if (data.flags !== undefined) this.flags = data.flags;
		if (!this.threadId || data.id) this.threadId = data.id || this.thread.Id;
		if (data.join_timestamp) {
			this.joinedAt = new Date(data.join_timestamp);
			this.joinedTimestamp = this.joinedAt.getTime();
		}
		if (data.user_id) {
			this.user = new PartialUser(this.client, { id: data.user_id });
			this.Id = this.user.Id;
		}
	}
}

export = ThreadMember;
