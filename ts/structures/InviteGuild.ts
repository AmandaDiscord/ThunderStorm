// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import AnonymousGuild from "./AnonymousGuild";
import WelcomeScreen from "./WelcomeChannel";

class InviteGuild extends AnonymousGuild {
	public welcomeScreen: WelcomeScreen | null;

	public static readonly default = InviteGuild;

	public constructor(client: import("../client/Client"), data: any) {
		super(client, data);
		this.welcomeScreen = typeof data.welcome_screen !== "undefined" ? new WelcomeScreen(this, data.welcome_screen) : null;
	}
}

export = InviteGuild;
