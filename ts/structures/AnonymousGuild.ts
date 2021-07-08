import BaseGuild from "./BaseGuild";
import { VerificationLevels, NSFWLevels } from "../util/Constants";

/**
 * Bundles common attributes and methods between {@link Guild} and {@link InviteGuild}
 * @abstract
 */
class AnonymousGuild extends BaseGuild {
	public splash!: string | null;
	public banner!: string | null;
	public description!: string | null;
	public verificationLevel!: import("../Types").VerificationLevel;
	public vanityURLCode!: string | null;
	public nsfwLevel!: import("../Types").NSFWLevel;

	public constructor(client: import("../client/Client"), data: any) {
		super(client, data);
		this._patch(data);
	}

	public _patch(data: any) {
		this.features = data.features;
		this.splash = data.splash;
		this.banner = data.banner;
		this.description = data.description;
		this.verificationLevel = VerificationLevels[data.verification_level];
		this.vanityURLCode = data.vanity_url_code;

		if ("nsfw_level" in data) {
			this.nsfwLevel = NSFWLevels[data.nsfw_level as Exclude<keyof typeof NSFWLevels, string>];
		}
	}

	public bannerURL(options: import("../Types").ImageURLOptions = {}) {
		if (!this.banner) return null;
		return this.client.rest.cdn.Banner(this.id, this.banner, options.format, options.size);
	}

	public splashURL(options: import("../Types").ImageURLOptions = {}) {
		if (!this.splash) return null;
		return this.client.rest.cdn.Splash(this.id, this.splash, options.format, options.size);
	}
}

export = AnonymousGuild;
