import TextBasedChannel from "../Interfaces/TextBasedChannel";
import PartialBase from "./PartialBase";
declare class PartialUser extends PartialBase<import("../User")> implements TextBasedChannel {
    lastMessageID: TextBasedChannel["lastMessageID"];
    lastMessage: TextBasedChannel["lastMessage"];
    send: TextBasedChannel["send"];
    partialType: "User";
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData);
    toString(): string;
}
export = PartialUser;
