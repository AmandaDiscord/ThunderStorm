const Immutable: typeof import("@augu/immutable") = require("@augu/immutable");

class Collection<_K, V> extends Immutable.Collection<V> {
	public constructor(from?: Array<V> | Record<string | number | symbol, V> | undefined) {
		super(from);
	}
}

export = Collection;
