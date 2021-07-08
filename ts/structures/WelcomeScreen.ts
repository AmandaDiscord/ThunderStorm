import Base from "./Base";
import WelcomeChannel from "./WelcomeChannel";
import Collection from "../util/Collection";

class WelcomeScreen extends Base {
	public guild: import("./Guild") | import("./Partial/PartialGuild");
	public description: string | null;
	public welcomeChannels: Collection<string, WelcomeChannel>;

	public constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: any) {
		super(guild.client);

		this.guild = guild;
		this.description = data.description ?? null;
		this.welcomeChannels = new Collection();

		for (const channel of data.welcome_channels) {
			const welcomeChannel = new WelcomeChannel(this.guild, channel);
			this.welcomeChannels.set(welcomeChannel.channelID, welcomeChannel);
		}
	}

	public get enabled() {
		return this.guild.partial ? false : this.guild.features.includes("WELCOME_SCREEN_ENABLED");
	}
}

export = WelcomeScreen;
