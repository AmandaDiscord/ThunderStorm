import EventEmitter from "events";
import { TypeError } from "../../errors";
import Collection from "../../util/Collection";
import Util from "../../util/Util";

interface CollectorEvents<T> {
	collect: Array<any>;
	dispose: Array<any>;
	end: [Collection<string, T>, string];
}

interface Collector<T> {
	addListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	emit<E extends keyof CollectorEvents<T>>(event: E, ...args: CollectorEvents<T>[E]): boolean;
	eventNames(): Array<keyof CollectorEvents<T>>;
	listenerCount(event: keyof CollectorEvents<T>): number;
	listeners(event: keyof CollectorEvents<T>): Array<(...args: Array<any>) => any>;
	off<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	on<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	once<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	prependListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	prependOnceListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
	rawListeners(event: keyof CollectorEvents<T>): Array<(...args: Array<any>) => any>;
	removeAllListeners(event?: keyof CollectorEvents<T>): this;
	removeListener<E extends keyof CollectorEvents<T>>(event: E, listener: (...args: CollectorEvents<T>[E]) => any): this;
}

abstract class Collector<T> extends EventEmitter {
	public client: import("../../client/Client");
	public filter: import("../../Types").CollectorFilter<T>;
	public options: import("../../Types").CollectorOptions;
	public collected: Collection<string, T> = new Collection();
	public ended = false;
	private _timeout: NodeJS.Timeout | null = null;
	private _idletimeout: NodeJS.Timeout | null = null;

	public constructor(client: import("../../client/Client"), filter: import("../../Types").CollectorFilter<T>, options: import("../../Types").CollectorOptions = {}) {
		super();

		this.client = client;
		this.filter = filter;
		this.options = options;

		if (typeof filter !== "function") {
			throw new TypeError("INVALID_TYPE", "filter", "function");
		}

		this.handleCollect = this.handleCollect.bind(this);
		this.handleDispose = this.handleDispose.bind(this);

		if (options.time) this._timeout = this.client.setTimeout(() => this.stop("time"), options.time);
		if (options.idle) this._idletimeout = this.client.setTimeout(() => this.stop("idle"), options.idle);
	}

	public async handleCollect(...args: Array<any>) {
		const collect = this.collect(...args);

		// @ts-ignore
		if (collect && (await this.filter(...args, this.collected))) {
			this.collected.set(collect, args[0]);

			this.emit("collect", ...args);

			if (this._idletimeout) {
				this.client.clearTimeout(this._idletimeout);
				this._idletimeout = this.client.setTimeout(() => this.stop("idle"), this.options.idle as number);
			}
		}
		this.checkEnd();
	}

	public handleDispose(...args: Array<any>) {
		if (!this.options.dispose) return;

		const dispose = this.dispose(...args);
		// @ts-ignore
		if (!dispose || !this.filter(...args) || !this.collected.has(dispose)) return;
		this.collected.delete(dispose);
		this.emit("dispose", ...args);
		this.checkEnd();
	}

	public get next(): Promise<T> {
		return new Promise((resolve, reject) => {
			if (this.ended) {
				reject(this.collected);
				return;
			}

			const cleanup = () => {
				this.removeListener("collect", onCollect);
				this.removeListener("end", onEnd);
			};

			const onCollect = (item: T) => {
				cleanup();
				resolve(item);
			};

			const onEnd = () => {
				cleanup();
				reject(this.collected);
			};

			this.on("collect", onCollect);
			this.on("end", onEnd);
		});
	}

	public stop(reason = "user") {
		if (this.ended) return;

		if (this._timeout) {
			this.client.clearTimeout(this._timeout);
			this._timeout = null;
		}

		if (this._idletimeout) {
			this.client.clearTimeout(this._idletimeout);
			this._idletimeout = null;
		}

		this.ended = true;
		this.emit("end", this.collected, reason);
	}

	public resetTimer(options: Exclude<import("../../Types").CollectorOptions, "dispose"> = {}) {
		if (this._timeout) {
			this.client.clearTimeout(this._timeout);
			this._timeout = this.client.setTimeout(() => this.stop("time"), options.time || this.options.time as number);
		}
		if (this._idletimeout) {
			this.client.clearTimeout(this._idletimeout);
			this._idletimeout = this.client.setTimeout(() => this.stop("idle"), options.idle || this.options.idle as number);
		}
	}

	public checkEnd() {
		const reason = this.endReason;
		if (reason) this.stop(reason);
	}

	public async *[Symbol.asyncIterator]() {
		const queue: Array<any> = [];
		const onCollect = (item: any) => queue.push(item);
		this.on("collect", onCollect);

		try {
			while (queue.length || !this.ended) {
				if (queue.length) {
					yield queue.shift();
				} else {
					await new Promise(resolve => {
						const tick = () => {
							this.removeListener("collect", tick);
							this.removeListener("end", tick);
							return resolve(undefined);
						};
						this.on("collect", tick);
						this.on("end", tick);
					});
				}
			}
		} finally {
			this.removeListener("collect", onCollect);
		}
	}

	public toJSON() {
		return Util.flatten(this);
	}

	public abstract collect(...args: Array<any>): string | null
	public abstract dispose(...args: Array<any>): string | null;
	public abstract get endReason(): string | null;
}

export = Collector;
