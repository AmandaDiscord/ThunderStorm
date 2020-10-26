import User from "./User";

class ClientUser extends User {
	constructor(data: import("@amanda/discordtypings").UserData, client: import("./Client")) {
		super(data, client);
	}
}

export = ClientUser;
