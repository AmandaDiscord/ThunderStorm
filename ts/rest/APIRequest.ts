type Options = {
	route: string;
	data?: any;
	auth?: boolean;
	versioned?: boolean;
	query?: any;
	reason?: string;
	headers?: any;
	files?: Array<any>;
}

type HTTPMethod = Parameters<import("snowtransfer/dist/src/RequestHandler")["request"]>[1];

class APIRequest {
	public rest: import("./RESTManager");
	public client: import("../client/BaseClient");
	public method: HTTPMethod;
	public route: string;
	public options: Options;
	public retries: number;
	public path: string;

	public constructor(rest: import("./RESTManager"), method: HTTPMethod, path: string, options: Options) {
		this.rest = rest;
		this.client = rest.client;
		this.method = method;
		this.route = options.route;
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
		return this.client._snow.requestHandler.request(this.options.route, this.method, this.options.files && this.options.files.length ? "multipart" : "json", this.options.data, this.retries);
	}
}

export = APIRequest;
