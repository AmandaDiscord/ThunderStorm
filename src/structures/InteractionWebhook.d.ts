import Webhook from "./Webhook";
declare class InteractionWebhook implements Webhook {
    send: Webhook["send"];
    fetchMessage: Webhook["fetchMessage"];
    editMessage: Webhook["editMessage"];
    deleteMessage: Webhook["deleteMessage"];
    url: Webhook["url"];
    avatarURL: Webhook["avatarURL"];
    avatar: Webhook["avatar"];
    name: Webhook["name"];
    type: Webhook["type"];
    guildId: Webhook["guildId"];
    channelId: Webhook["channelId"];
    owner: Webhook["owner"];
    sourceGuild: Webhook["sourceGuild"];
    sourceChannel: Webhook["sourceChannel"];
    client: import("../client/Client");
    id: string;
    token: string;
    static readonly default: typeof InteractionWebhook;
    constructor(client: import("../client/Client"), id: string, token: string);
}
export = InteractionWebhook;
