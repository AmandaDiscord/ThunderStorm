import Action from "./Action";
import { Events } from "../../util/Constants";

class UserUpdateAction extends Action {
	public handle(data: import("discord-typings").UserData) {
		const User: typeof import("../../structures/User") = require("../../structures/User");
		const user = data.id === this.client.user?.id ? this.client.user : new User(this.client, data);
		if (data.id === this.client.user?.id) this.client.user._patch(data);

		this.client.emit(Events.USER_UPDATE, user);

		return {
			old: null,
			updated: user
		};
	}
}

export = UserUpdateAction;
