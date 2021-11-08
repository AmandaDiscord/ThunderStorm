import Application from "./interfaces/Application";

class IntegrationApplication extends Application {
	public bot!: import("./User") | null;
	public termsOfServiceURL!: string | null;
	public privacyPolicyURL!: string | null;
	public rpcOrigins!: Array<string>;
	public summary!: string | null;
	public hook!: boolean | null;
	public cover!: string | null;
	public verifyKey!: string | null;

	public _patch(data: import("discord-typings").IntegrationApplicationData) {
		super._patch(data as import("discord-typings").ApplicationData);
		const User: typeof import("./User") = require("./User");

		this.bot = data.bot ? (data.bot.id === this.client.user?.id ? this.client.user : new User(this.client, data.bot)) : this.bot ?? null;
		this.termsOfServiceURL = (data as import("discord-typings").ApplicationData).terms_of_service_url ?? this.termsOfServiceURL ?? null;
		this.privacyPolicyURL = (data as import("discord-typings").ApplicationData).privacy_policy_url ?? this.privacyPolicyURL ?? null;
		this.rpcOrigins = (data as import("discord-typings").ApplicationData).rpc_origins ?? this.rpcOrigins ?? [];
		this.summary = data.summary ?? this.summary ?? null;
		this.cover = (data as import("discord-typings").ApplicationData).cover_image ?? this.cover ?? null;
		this.verifyKey = (data as import("discord-typings").ApplicationData).verify_key ?? this.verifyKey ?? null;
	}
}

export = IntegrationApplication;
