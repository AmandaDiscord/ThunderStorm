import AnonymousGuild from "./AnonymousGuild";
import WelcomeScreen from "./WelcomeChannel";
declare class InviteGuild extends AnonymousGuild {
    welcomeScreen: WelcomeScreen | null;
    constructor(client: import("../client/Client"), data: any);
}
export = InviteGuild;
