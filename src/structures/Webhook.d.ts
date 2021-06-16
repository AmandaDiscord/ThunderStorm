import APIMessage from "./APIMessage";
import { WebhookTypes } from "../util/Constants";
declare class Webhook {
    client: import("../client/Client");
    name: string | null;
    token: string | null;
    avatar: string | null;
    id: string;
    type: typeof WebhookTypes[import("@amanda/discordtypings").WebhookData["type"]];
    guildID: string;
    channelID: string;
    owner: import("./User") | null;
    sourceGuild: import("./Guild") | null;
    sourceChannel: import("./NewsChannel") | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").WebhookData);
    _patch(data: import("@amanda/discordtypings").WebhookData): void;
    send(options: string | APIMessage | import("../Types").WebhookMessageOptions): Promise<import("./Message")>;
    /**
     * Sends a raw slack message with this webhook.
     * @param body The raw body to send
     * @example
     * // Send a slack message
     * webhook.sendSlackMessage({
     * 	"username": "Wumpus",
     * 	"attachments": [{
     * 		"pretext": "this looks pretty cool",
     * 		"color": "#F0F",
     * 		"footer_icon": "http://snek.s3.amazonaws.com/topSnek.png",
     * 		"footer": "Powered by sneks",
     * 		"ts": Date.now() / 1000
     * 	}]
     * }).catch(console.error);
     */
    sendSlackMessage(body: any): Promise<boolean>;
    edit(options?: {
        name?: string;
        avatar?: import("../Types").BufferResolvable;
        channel?: import("../Types").ChannelResolvable;
    }): Promise<Webhook>;
    fetchMessage(message: string | "@original"): Promise<import("./Message")>;
    editMessage(message: import("../Types").MessageResolvable | "@original", options: string | APIMessage | import("../Types").WebhookEditMessageOptions): Promise<import("./Message")>;
    delete(): Promise<void>;
    deleteMessage(message: import("../Types").MessageResolvable | "@original"): Promise<void>;
    get createdTimestamp(): number;
    get createdAt(): Date;
    get url(): string;
    avatarURL({ format, size }?: import("../Types").ImageURLOptions): string | null;
    static applyToClass(structure: any, ignore?: Array<keyof Webhook>): void;
}
export = Webhook;
