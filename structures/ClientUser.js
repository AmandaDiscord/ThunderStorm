const User = require("./User");

class ClientUser extends User {
	/**
	 * @param {import("../typings/internal").UserData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);
	}
}

module.exports = ClientUser;
