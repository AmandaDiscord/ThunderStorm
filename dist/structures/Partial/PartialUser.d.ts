import PartialBase from "./PartialBase";
declare class PartialUser extends PartialBase<import("../User")> {
    partialType: "User";
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    send(content: import("../../types").StringResolvable, options?: import("../../types").MessageOptions): Promise<import("../Message")>;
}
export = PartialUser;
