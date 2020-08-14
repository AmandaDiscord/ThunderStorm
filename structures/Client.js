const EventEmitter = require("events").EventEmitter;
const { CLIENT_ONLY_EVENTS: ClientEvents, CLOUD_ONLY_EVENTS: CloudEvents } = require("../constants");

const handle = require("../handle");

class Client extends EventEmitter {
	/**
	 * @param {import("../typings/index").ClientOptions} options
	 */
	constructor(options) {
		super();

		/** @type {import("./ClientUser")} */
		this.user = null;
		this.token = options.cloudstorm.token;

		this._snow = options.snowtransfer;
		this._cloud = options.cloudstorm;

		const disconnectHandle = () => {
			this._cloud.removeListener(CloudEvents.DISCONNECTED, disconnectHandle);
			this._cloud.removeListener(CloudEvents.EVENT, this._handle);
			this._cloud.removeListener(CloudEvents.SHARD_READY, shardReadyHandle);
			this.emit(ClientEvents.SHARD_DISCONNECT);
		}
		const shardReadyHandle = (data) => {
			if (!data.ready) this.emit(ClientEvents.SHARD_RESUMED, data.id);
			else this.emit(ClientEvents.SHARD_RESUMED, data.id);
		}

		this._cloud.on(CloudEvents.DISCONNECTED, disconnectHandle);
		this._cloud.on(CloudEvents.EVENT, this._handle);
		this._cloud.on(CloudEvents.SHARD_READY, shardReadyHandle);
	}
	/**
	 * @param {import("../typings/internal").InboundDataType<keyof import("../typings/internal").CloudStormEventDataTable>} data
	 */
	_handle(data) {
		handle(data, this);
	}

	async login() {
		await this._cloud.connect();
	}
}

module.exports = Client;
