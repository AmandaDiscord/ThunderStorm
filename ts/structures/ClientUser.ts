// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import centra from "centra";
import fs from "fs";
import path from "path";
import User from "./User";

// @ts-ignore
class ClientUser extends User {
	public mfaEnabled = false;

	public static readonly default = ClientUser;

	public constructor(client: import("../client/Client"), data: import("discord-typings").UserData) {
		super(client, data);

		if (data.mfa_enabled !== undefined) this.mfaEnabled = data.mfa_enabled;
	}

	public get verified() {
		return this.flags.has("VERIFIED_BOT");
	}

	public async edit(data: { username?: string; avatar?: import("../Types").BufferResolvable }) {
		let buf;
		if (typeof data.avatar === "string" && data.avatar.startsWith("http")) buf = await centra(data.avatar, "get").header("User-Agent", "").send().then(d => d.body ? d.body : undefined);
		else if (typeof data.avatar === "string") buf = await fs.promises.readFile(path.isAbsolute(data.avatar) ? data.avatar : path.join(process.cwd(), data.avatar));
		else buf = data.avatar;

		const payload = {};

		if (buf) Object.assign(payload, { avatar: buf });
		if (data.username) Object.assign(payload, { username: data.username });

		if (Object.keys(payload).length === 0) throw new Error("Invalid Update self payload. Missing username or avatar properties");

		const newdata = await this.client._snow.user.updateSelf(payload);
		this._patch(newdata);
		return this;
	}

	public _patch(data: import("discord-typings").UserData) {
		if (data.mfa_enabled !== undefined) this.mfaEnabled = data.mfa_enabled;

		super._patch(data);
	}
}

export = ClientUser;
