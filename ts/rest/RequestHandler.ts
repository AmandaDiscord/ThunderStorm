class RequestHandler {
	public manager: import("./RESTManager");
	public queue: Record<string, never>;
	public reset = -1;
	public remaining = -1;
	public limit = -1;

	public constructor(manager: import("./RESTManager")) {
		this.manager = manager;
		this.queue = {};
		this.reset = -1;
		this.remaining = -1;
		this.limit = -1;
	}

	public push(request: import("./APIRequest")) {
		return this.execute(request);
	}

	public get globalLimited() {
		return this.manager.globalRemaining <= 0 && Date.now() < (this.manager.globalReset as number);
	}

	public get localLimited() {
		return this.remaining <= 0 && Date.now() < this.reset;
	}

	public get limited() {
		return this.globalLimited || this.localLimited;
	}

	public get _inactive() {
		return this.queue.remaining === 0 && !this.limited;
	}

	public globalDelayFor(ms: number): Promise<void> {
		return new Promise(resolve => {
			this.manager.client.setTimeout(() => {
				this.manager.globalDelay = null;
				resolve(undefined);
			}, ms);
		});
	}

	public execute(request: import("./APIRequest")) {
		// As the request goes out, update the global usage information
		if (!this.manager.globalReset || this.manager.globalReset < Date.now()) {
			this.manager.globalReset = Date.now() + 1000;
			this.manager.globalRemaining = this.manager.globalLimit;
		}
		this.manager.globalRemaining--;

		return request.make();
	}
}

export = RequestHandler;
