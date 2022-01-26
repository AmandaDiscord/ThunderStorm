import Base from "./Base";
import Emoji from "./Emoji";
declare class WelcomeChannel extends Base {
    guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild");
    description: string;
    private _emoji;
    channelId: string;
    static readonly default: typeof WelcomeChannel;
    constructor(guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild"), data: import("discord-typings").WelcomeScreenChannelData);
    get channel(): import("./Partial/PartialChannel");
    get emoji(): Emoji;
}
export = WelcomeChannel;
