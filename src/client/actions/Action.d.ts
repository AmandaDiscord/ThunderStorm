import { PartialTypes } from "../../util/Constants";
declare class GenericAction {
    client: import("../Client");
    constructor(client: import("../Client"));
    handle(data: any): any;
    getPayload(data: any, manager: any, id: string, partialType: keyof typeof PartialTypes): any;
    getChannel(data: any): any;
    getMessage(data: any, channel: any): any;
    getReaction(data: any, message: any, user: any): any;
    getMember(data: any, guild: any): any;
    getUser(data: any): any;
    getUserFromMember(data: any): any;
}
export = GenericAction;
