import Collection from "../util/Collection";

abstract class BaseManager<T, C extends Collection<string, T>> {
	public client: import("../client/Client");
	public holds: new (...args: Array<any>) => T;
	public cacheType: C["constructor"];
	public cache: C;

	public constructor(client: import("../client/Client"), iterable: IterableIterator<T> | undefined, holds: new (...args: Array<any>) => T, cacheType: C["constructor"] = Collection, ...cacheOptions: ConstructorParameters<C["constructor"]>) {
		this.holds = holds;
		this.client = client;
		this.cacheType = cacheType;
		this.cache = new cacheType(...cacheOptions) as C;
		if (iterable) for (const i of iterable) this._add(i);
	}

	public _add(data: T, cache = true, options: { id?: string; extras?: Array<any> } = { extras: [] }) {
		const existing = this.cache.get(options.id || (data as any).id);
		if (existing && (existing as any)._patch && cache) (existing as any)._patch(data);
		if (existing) return existing;

		const entry = this.holds ? new this.holds(this.client, data, ...options.extras || []) : data;
		if (cache) this.cache.set(options.id || (entry as any).id, entry);
		return entry;
	}

	public resolve(idOrInstance: string | T): T | null {
		if (idOrInstance instanceof this.holds) return idOrInstance;
		if (typeof idOrInstance === "string") return this.cache.get(idOrInstance) || null;
		return null;
	}

	public resolveId(idOrInstance: string | T): string | null {
		if (idOrInstance instanceof this.holds) return (idOrInstance as any).id;
		if (typeof idOrInstance === "string") return idOrInstance;
		return null;
	}

	public valueOf() {
		return this.cache;
	}
}

export = BaseManager;
