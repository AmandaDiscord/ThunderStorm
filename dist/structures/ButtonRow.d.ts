import Collection from "./Util/Collection";
declare class ButtonRow {
    children: Collection<string, import("./Button")>;
    constructor(children: Array<import("./Button")>);
    toJSON(): {
        type: 1;
        components: import("@amanda/discordtypings").ButtonData[];
    };
}
export = ButtonRow;
