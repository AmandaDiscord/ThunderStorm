import Base from "./Base";
import WelcomeChannel from "./WelcomeChannel";
import Collection from "../util/Collection";
declare class WelcomeScreen extends Base {
    guild: import("./Guild") | import("./Partial/PartialGuild");
    description: string | null;
    welcomeChannels: Collection<string, WelcomeChannel>;
    constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: any);
    get enabled(): boolean;
}
export = WelcomeScreen;
