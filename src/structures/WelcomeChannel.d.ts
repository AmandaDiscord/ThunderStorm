import Base from "./Base";
import Emoji from "./Emoji";
declare class WelcomeChannel extends Base {
    guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild");
    description: string;
    private _emoji;
    channelID: string;
    constructor(guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild"), data: import("@amanda/discordtypings").WelcomeScreenData);
    get channel(): import("./Partial/PartialChannel");
    get emoji(): Emoji;
}
export = WelcomeChannel;
