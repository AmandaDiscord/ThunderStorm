// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];

class HTTPError extends Error {
	public code: number;
	public method: HTTPMethod;
	public path: string;

	public static readonly default = HTTPError;

	public constructor(message: string, name: string, code: number, method: HTTPMethod, path: string) {
		super(message);
		this.name = name;
		this.code = code || 500;
		this.method = method;
		this.path = path;
	}
}

export = HTTPError;
