// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Base from "./Base";
import WelcomeChannel from "./WelcomeChannel";
import { Collection } from "@discordjs/collection";

// @ts-ignore
class WelcomeScreen extends Base {
	public guild: import("./Guild") | import("./Partial/PartialGuild");
	public description: string | null;
	public welcomeChannels: Collection<string, WelcomeChannel>;

	public static readonly default = WelcomeScreen;

	public constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: any) {
		super(guild.client);

		this.guild = guild;
		this.description = data.description ?? null;
		this.welcomeChannels = new Collection();

		for (const channel of data.welcome_channels) {
			const welcomeChannel = new WelcomeChannel(this.guild, channel);
			this.welcomeChannels.set(welcomeChannel.channelId, welcomeChannel);
		}
	}

	public get enabled() {
		return this.guild.partial ? false : this.guild.features.includes("WELCOME_SCREEN_ENABLED");
	}
}

export = WelcomeScreen;
