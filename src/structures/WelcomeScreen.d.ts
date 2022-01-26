import Base from "./Base";
import WelcomeChannel from "./WelcomeChannel";
import { Collection } from "@discordjs/collection";
declare class WelcomeScreen extends Base {
    guild: import("./Guild") | import("./Partial/PartialGuild");
    description: string | null;
    welcomeChannels: Collection<string, WelcomeChannel>;
    static readonly default: typeof WelcomeScreen;
    constructor(guild: import("./Guild") | import("./Partial/PartialGuild"), data: any);
    get enabled(): boolean;
}
export = WelcomeScreen;
