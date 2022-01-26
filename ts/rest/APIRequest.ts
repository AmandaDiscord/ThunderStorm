// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];

class APIRequest {
	public rest: import("./RESTManager");
	public client: import("../client/BaseClient");
	public method: HTTPMethod;
	public route: string;
	public options: import("../internal").RestOptions;
	public retries: number;
	public path: string;

	public static readonly default = APIRequest;

	public constructor(rest: import("./RESTManager"), method: HTTPMethod, path: string, options: import("../internal").RestOptions) {
		this.rest = rest;
		this.client = rest.client;
		this.method = method;
		this.route = options.route as string;
		this.options = options;
		this.retries = 0;

		let queryString = "";
		if (options.query) {
			const query = Object.entries(options.query)
				.filter(([, value]) => value !== null && typeof value !== "undefined")
				.flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
			queryString = new URLSearchParams(query).toString();
		}
		this.path = `${path}${queryString && `?${queryString}`}`;
	}

	public make() {
		return this.client._snow.requestHandler.request(this.options.route as string, this.method, this.options.files && this.options.files.length ? "multipart" : "json", this.options.data, this.retries);
	}
}

export = APIRequest;
