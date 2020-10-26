import { EventEmitter } from "events";

import VoiceRegion from "./VoiceRegion";

class Client extends EventEmitter {
	public options: import("../types").ClientOptions;
	public readyTimestamp: number | null;
	public token: string;
	public user: import("./ClientUser") | null;
	public _snow: import("snowtransfer");

	public constructor(options: import("../types").ClientOptions) {
		super();

		this.options = options;
		this.readyTimestamp = null;
		// eslint-disable-next-line no-useless-escape
		const match = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/); // ok bro
		if (match) this.token = match[1];
		else this.token = options.snowtransfer.token;
		this.user = null;

		this._snow = options.snowtransfer;
	}

	public emit<E extends keyof import("../types").ClientEvents>(event: E, ...args: import("../types").ClientEvents[E]) {
		return super.emit(event, args);
	}
	public once<E extends keyof import("../types").ClientEvents>(event: E, listener: (...args: import("../types").ClientEvents[E]) => any) {
		// @ts-ignore SHUT UP!!!
		return super.once(event, listener);
	}
	public on<E extends keyof import("../types").ClientEvents>(event: E, listener: (...args: import("../types").ClientEvents[E]) => any) {
		// @ts-ignore
		return super.on(event, listener);
	}

	public get readyAt() {
		return this.readyTimestamp ? new Date(this.readyTimestamp) : null;
	}

	public get uptime() {
		return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
	}

	public toString() {
		return this.user ? `<@${this.user.id}>` : "Client";
	}

	public async fetchUser(userID: string): Promise<import("./User")> {
		const User = require("./User");
		const user = await this._snow.user.getUser(userID);
		return new User(user, this);
	}

	public async fetchInvite(id: string): Promise<import("./Invite") | null> {
		const Invite = require("./Invite");
		const match = id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
		let code;
		if (match && match[1]) code = match[1];
		if (!code) return null;
		const data = await this._snow.invite.getInvite(code, true);
		return new Invite(data, this);
	}

	public async fetchVoiceRegions() {
		const data = await this._snow.voice.getVoiceRegions();
		return new Map(data.map(item => [item.id, new VoiceRegion(item)]));
	}
}

export = Client;
