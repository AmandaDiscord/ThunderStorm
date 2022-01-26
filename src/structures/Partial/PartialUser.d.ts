import TextBasedChannel from "../interfaces/TextBasedChannel";
import PartialBase from "./PartialBase";
declare class PartialUser extends PartialBase<import("../User")> implements TextBasedChannel {
    lastMessageId: TextBasedChannel["lastMessageId"];
    lastMessage: TextBasedChannel["lastMessage"];
    send: TextBasedChannel["send"];
    partialType: "User";
    static readonly default: typeof PartialUser;
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData);
    toString(): string;
}
export = PartialUser;
