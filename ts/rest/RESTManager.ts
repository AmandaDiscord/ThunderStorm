import APIRequest from "./APIRequest";
import routeBuilder from "./APIRouter";
import RequestHandler from "./RequestHandler";
import { Error } from "../errors";
import Collection from "../util/Collection";
import { Endpoints } from "../util/Constants";
import STEndpoints from "snowtransfer/dist/Endpoints";

type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];
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

class RESTManager {
	public client: import("../client/BaseClient");
	public handlers: Collection<string, RequestHandler> = new Collection();
	public tokenPrefix: "Bot";
	public versioned: boolean;
	public globalLimit: number;
	public globalRemaining: number;
	public globalReset: number | null = null;
	public globalDelay: Promise<void> | null = null;

	public constructor(client: import("../client/BaseClient"), tokenPrefix: RESTManager["tokenPrefix"] = "Bot") {
		this.client = client;
		this.handlers = new Collection();
		this.tokenPrefix = tokenPrefix;
		this.versioned = true;
		this.globalLimit = (client.options.restGlobalRateLimit || 0) > 0 ? client.options.restGlobalRateLimit || 0 : Infinity;
		this.globalRemaining = this.globalLimit;
		this.globalReset = null;
		this.globalDelay = null;
		if ((client.options.restSweepInterval || 0) > 0) {
			const interval = client.setInterval(() => {
				this.handlers.sweep(handler => handler._inactive);
			}, (client.options.restSweepInterval || 0) * 1000);
			interval.unref();
		}
	}

	/**
	 * I don't think you could feasibly type this.
	 */
	public get api() {
		return routeBuilder(this);
	}

	public getAuth() {
		const token = this.client.token || this.client.accessToken;
		if (token) return `${this.tokenPrefix} ${token}`;
		throw new Error("TOKEN_MISSING");
	}

	public get cdn() {
		return Endpoints.CDN(STEndpoints.CDN_URL);
	}

	public request(method: HTTPMethod, url: string, options: Options) {
		const apiRequest = new APIRequest(this, method, url, options);
		let handler = this.handlers.get(apiRequest.route);

		if (!handler) {
			handler = new RequestHandler(this);
			this.handlers.set(apiRequest.route, handler);
		}

		return handler.push(apiRequest);
	}

	public get endpoint() {
		return `${STEndpoints.BASE_HOST}${STEndpoints.BASE_URL}`;
	}

	public set endpoint(endpoint) {
		void 0;
	}
}

export = RESTManager;
