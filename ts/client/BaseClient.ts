import EventEmitter from "events";
import RESTManager from "../rest/RESTManager";
import Util from "../util/Util";

class BaseClient extends EventEmitter {
	private _timeouts: Set<NodeJS.Timeout>;
	private _intervals: Set<NodeJS.Timeout>;
	private _immediates: Set<NodeJS.Immediate>;
	public options: import("../Types").ClientOptions;
	public rest: import("../rest/RESTManager");
	public _snow: import("snowtransfer").SnowTransfer;
	public token: string;
	public accessToken: string | null = null;

	public constructor(options: import("../Types").ClientOptions) {
		super();

		this._timeouts = new Set();
		this._intervals = new Set();
		this._immediates = new Set();
		this.options = options;
		this.rest = new RESTManager(this, "Bot");
		this._snow = options.snowtransfer;
		// eslint-disable-next-line no-useless-escape
		const match = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/); // ok bro
		if (match) this.token = match[1];
		else this.token = options.snowtransfer.token;
	}

	public get api() {
		return this.rest.api;
	}

	public destroy() {
		for (const t of this._timeouts) this.clearTimeout(t);
		for (const i of this._intervals) this.clearInterval(i);
		for (const i of this._immediates) this.clearImmediate(i);
		this._timeouts.clear();
		this._intervals.clear();
		this._immediates.clear();
	}

	public setTimeout(fn: (...args: Array<any>) => any, delay: number, ...args: any[]): NodeJS.Timeout {
		const timeout = setTimeout(() => {
			fn(...args);
			this._timeouts.delete(timeout);
		}, delay);
		this._timeouts.add(timeout);
		return timeout;
	}

	public clearTimeout(timeout: NodeJS.Timeout) {
		clearTimeout(timeout);
		this._timeouts.delete(timeout);
	}

	public setInterval(fn: (...args: Array<any>) => any, delay: number, ...args: any[]): NodeJS.Timeout {
		const interval = setInterval(fn, delay, ...args);
		this._intervals.add(interval);
		return interval;
	}

	public clearInterval(interval: NodeJS.Timeout) {
		clearInterval(interval);
		this._intervals.delete(interval);
	}

	public setImmediate(fn: (...args: Array<any>) => any, ...args: any[]): NodeJS.Immediate {
		const immediate = setImmediate(fn, ...args);
		this._immediates.add(immediate);
		return immediate;
	}

	public clearImmediate(immediate: NodeJS.Immediate) {
		clearImmediate(immediate);
		this._immediates.delete(immediate);
	}

	public incrementMaxListeners() {
		const maxListeners = this.getMaxListeners();
		if (maxListeners !== 0) {
			this.setMaxListeners(maxListeners + 1);
		}
	}

	public decrementMaxListeners() {
		const maxListeners = this.getMaxListeners();
		if (maxListeners !== 0) {
			this.setMaxListeners(maxListeners - 1);
		}
	}

	public toJSON(...props: Array<any>) {
		return Util.flatten(this, { domain: false }, ...props);
	}
}

export = BaseClient;
