import { EventEmitter } from "events";

import Constants from "../Constants";

import Collection from "./Util/Collection";
import VoiceRegion from "./VoiceRegion";

interface Client {
	addListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	emit<E extends keyof import("../Types").ClientEvents>(event: E, ...args: import("../Types").ClientEvents[E]): boolean;
	eventNames(): Array<keyof import("../Types").ClientEvents>;
	listenerCount(event: keyof import("../Types").ClientEvents): number;
	listeners(event: keyof import("../Types").ClientEvents): Array<(...args: Array<any>) => any>;
	off<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	on<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	once<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	prependListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	prependOnceListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
	rawListeners(event: keyof import("../Types").ClientEvents): Array<(...args: Array<any>) => any>;
	removeAllListeners(event?: keyof import("../Types").ClientEvents): this;
	removeListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
}

class Client extends EventEmitter {
	public options: import("../Types").ClientOptions;
	public readyTimestamp: number | null;
	public token: string;
	public user: import("./ClientUser") | null;
	public _snow: import("snowtransfer");

	public constructor(options: import("../Types").ClientOptions) {
		super();

		this.options = options;
		this.readyTimestamp = null;
		// eslint-disable-next-line no-useless-escape
		const match = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/); // ok bro
		if (match) this.token = match[1];
		else this.token = options.snowtransfer.token;
		this.user = null;

		this._snow = options.snowtransfer;
		this._snow.requestHandler.on("rateLimit", data => {
			this.emit(Constants.CLIENT_ONLY_EVENTS.RATE_LIMIT, data);
		});
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
		if (user.id === this.user?.id) this.user._patch(user);
		return user.id === this.user?.id ? this.user : new User(user, this);
	}

	public async fetchInvite(id: string): Promise<import("./Invite") | null> {
		const Invite = require("./Invite");
		const match = id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
		let code;
		if (match && match[1]) code = match[1];
		if (!code) return null;
		const data = await this._snow.invite.getInvite(code, { with_counts: true, with_expiration: true });
		return new Invite(data, this);
	}

	public async fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>> {
		const data = await this._snow.voice.getVoiceRegions();
		return new Collection(data.map(item => [item.id, new VoiceRegion(item)]));
	}
}

export = Client;
