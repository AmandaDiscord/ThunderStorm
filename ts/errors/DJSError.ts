const kCode = Symbol("code");
const messages = new Map();

interface DiscordjsErrorConstructor {
	new(msg?: string): ReturnType<typeof makeDiscordjsError>;
	new(key: string, ...args: Array<any>): ReturnType<typeof makeDiscordjsError>;
	readonly prototype: ReturnType<typeof makeDiscordjsError>;
	readonly [Symbol.species]: DiscordjsErrorConstructor;
}

function makeDiscordjsError(Base: ErrorConstructor) {
	return class DiscordjsError extends Base {
		public ["constructor"]: typeof DiscordjsError;
		public static readonly default: typeof DiscordjsError = DiscordjsError;
		readonly [Symbol.species]: DiscordjsErrorConstructor;

		public [kCode]: string;

		public constructor(key: string, ...args: Array<any>) {
			super(message(key, args));
			this[kCode] = key;
			if (Error.captureStackTrace) Error.captureStackTrace(this, DiscordjsError);
		}

		public get name() {
			return `${super.name} [${this[kCode]}]`;
		}

		public get code() {
			return this[kCode];
		}
	};
}

function message(key: string, args: Array<any>): string {
	if (typeof key !== "string") throw new Error("Error message key must be a string");
	const msg = messages.get(key);
	if (!msg) throw new Error(`An invalid error message key was used: ${key}.`);
	if (typeof msg === "function") return msg(...args);
	if (args === undefined || args.length === 0) return msg;
	args.unshift(msg);
	return String(...args);
}

function register(sym: string, val: any) {
	messages.set(sym, typeof val === "function" ? val : String(val));
}

// @ts-ignore
const DJSError: {
	register: typeof register,
	Error: ReturnType<typeof makeDiscordjsError>;
	TypeError: ReturnType<typeof makeDiscordjsError>;
	RangeError: ReturnType<typeof makeDiscordjsError>;
	Messages: typeof import("./Messages")
} = {
	register,
	Error: makeDiscordjsError(Error),
	// @ts-ignore
	TypeError: makeDiscordjsError(TypeError),
	// @ts-ignore
	RangeError: makeDiscordjsError(RangeError)
};

export = DJSError;
