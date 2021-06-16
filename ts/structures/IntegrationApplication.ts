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

	public _patch(data: import("@amanda/discordtypings").ApplicationData) {
		super._patch(data);
		const User: typeof import("./User") = require("./User");

		// @ts-ignore
		this.bot = data.bot ? (data.bot.id === this.client.user?.id ? this.client.user : new User(this.client, data.bot)) : this.bot ?? null;
		this.termsOfServiceURL = data.terms_of_service_url ?? this.termsOfServiceURL ?? null;
		this.privacyPolicyURL = data.privacy_policy_url ?? this.privacyPolicyURL ?? null;
		this.rpcOrigins = data.rpc_origins ?? this.rpcOrigins ?? [];
		this.summary = data.summary ?? this.summary ?? null;
		// @ts-ignore
		this.hook = data.hook ?? this.hook ?? null;
		this.cover = data.cover_image ?? this.cover ?? null;
		this.verifyKey = data.verify_key ?? this.verifyKey ?? null;
	}
}

export = IntegrationApplication;
