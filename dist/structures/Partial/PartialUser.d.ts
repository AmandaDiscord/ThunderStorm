import PartialBase from "./PartialBase";
declare class PartialUser extends PartialBase<import("../User")> {
    partialType: "User";
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    send(content: import("../../Types").StringResolvable, options?: Exclude<import("../../Types").MessageOptions, "suppress">): Promise<import("../Message")>;
}
export = PartialUser;
