import Collection from "./Util/Collection";
declare class Button {
    client: import("./Client");
    type: "button" | "row";
    style: "primary" | "secondary" | "success" | "danger" | "link" | null;
    children: Collection<string, Button>;
    label: string | null;
    emoji: {
        id: string | null;
        name: string;
        animated: boolean;
    } | null;
    identifier: string | null;
    url?: string | null;
    disabled?: boolean;
    constructor(data: import("@amanda/discordtypings").MessageComponentData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").MessageComponentData;
    _patch(data: import("@amanda/discordtypings").MessageComponentData): void;
}
export = Button;
