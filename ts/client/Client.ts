import Collection from "../util/Collection";
import Constants from "../util/Constants";

import BaseClient from "./BaseClient";

import ActionsManager from "./actions/ActionManager";
import ClientVoiceManager from "./voice/ClientVoiceManager";

import ClientApplication from "../structures/ClientApplication";
import VoiceRegion from "../structures/VoiceRegion";
import Webhook from "../structures/Webhook";

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

class Client extends BaseClient {
	public readyTimestamp: number | null = null;
	public user: import("../structures/ClientUser") | null = null;
	public actions: ActionsManager;
	public voice: ClientVoiceManager;
	public application: ClientApplication | null = null;

	public constructor(options: import("../Types").ClientOptions) {
		super(options);

		this.actions = new ActionsManager(this);
		this.voice = new ClientVoiceManager(this);

		this._snow.requestHandler.on("rateLimit", data => {
			this.emit(Constants.Events.RATE_LIMIT, data);
		});
	}

	public get readyAt() {
		return this.readyTimestamp ? new Date(this.readyTimestamp) : null;
	}

	public get uptime() {
		return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
	}

	public toString() {
		return this.user ? `<@${this.user.Id}>` : "Client";
	}

	public async fetchUser(userId: string): Promise<import("../structures/User")> {
		const User: typeof import("../structures/User") = require("../structures/User");
		const user = await this._snow.user.getUser(userId);
		if (user.id === this.user?.Id) this.user!._patch(user);
		return user.id === this.user?.Id ? this.user! : new User(this, user);
	}

	public async fetchInvite(Id: string): Promise<import("../structures/Invite") | null> {
		const Invite: typeof import("../structures/Invite") = require("../structures/Invite");
		const match = Id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
		let code;
		if (match && match[1]) code = match[1];
		if (!code) return null;
		const data = await this._snow.invite.getInvite(code, { with_counts: true, with_expiration: true });
		return new Invite(this, data);
	}

	public async fetchWebhook(Id: string, token?: string) {
		const data = await this._snow.webhook.getWebhook(Id, token);
		return new Webhook(this, { token, ...data });
	}

	public async fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>> {
		const data = await this._snow.voice.getVoiceRegions();
		return new Collection(data.map(item => [item.id, new VoiceRegion(item)]));
	}
}

export = Client;
