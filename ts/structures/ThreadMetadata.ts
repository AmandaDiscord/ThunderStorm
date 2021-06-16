import SnowflakeUtil from "../util/SnowflakeUtil";

class ThreadMetaData {
	public client: import("../client/Client");
	public thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel");
	public locked = false;
	public autoArchiveDuration = 60;
	public archiver: import("./Partial/PartialUser") | null = null;
	public archiveStatusChangedAt!: Date;
	public archiveStatusChangedTimestamp!: number;
	private _archived = false;

	public constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel"), data: import("@amanda/discordtypings").ThreadMetaData) {
		this.client = thread.client;
		this.thread = thread;

		if (data) this._patch(data);
	}

	public get archived() {
		if (this._archived || this.archiver) return true;
		if (this.thread.lastMessageID && this.autoArchiveDuration !== 0) {
			const lastSendTimestamp = SnowflakeUtil.deconstruct(this.thread.lastMessageID).timestamp;
			if (Date.now() >= lastSendTimestamp + (this.autoArchiveDuration * 1000 * 60)) return true;
		}
		if (this.archiveStatusChangedTimestamp && this.autoArchiveDuration && Date.now() > this.archiveStatusChangedTimestamp + (this.autoArchiveDuration * 1000 * 60)) return true;
		return false;
	}

	public toJSON() {
		const value: { locked: boolean; auto_archive_duration: number; archived: boolean; archive_timestamp: string; archiver_id?: string; } = {
			locked: this.locked,
			auto_archive_duration: this.autoArchiveDuration,
			archived: this.archived,
			archive_timestamp: this.archiveStatusChangedAt.toISOString()
		};
		if (this.archiver) value["archiver_id"] = this.archiver.id;
		return value;
	}

	public _patch(data: import("@amanda/discordtypings").ThreadMetaData) {
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		if (data) {
			if (data.locked !== undefined) this.locked = data.locked;
			if (data.auto_archive_duration !== undefined) this.autoArchiveDuration = data.auto_archive_duration;
			if (data.archived !== undefined) this._archived = data.archived;
			if (data.archiver_id !== undefined) this.archiver = data.archiver_id !== null ? new PartialUser(this.client, { id: data.archiver_id }) : null;
			if (data.archive_timestamp !== undefined) {
				this.archiveStatusChangedAt = new Date(data.archive_timestamp);
				this.archiveStatusChangedTimestamp = this.archiveStatusChangedAt.getTime();
			}
		}
	}
}

export = ThreadMetaData;
