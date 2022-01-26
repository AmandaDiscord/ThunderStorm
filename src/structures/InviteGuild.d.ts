import AnonymousGuild from "./AnonymousGuild";
import WelcomeScreen from "./WelcomeChannel";
declare class InviteGuild extends AnonymousGuild {
    welcomeScreen: WelcomeScreen | null;
    static readonly default: typeof InviteGuild;
    constructor(client: import("../client/Client"), data: any);
}
export = InviteGuild;
