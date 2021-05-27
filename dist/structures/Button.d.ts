declare class Button {
    client: import("./Client");
    style: "primary" | "secondary" | "success" | "danger" | "link";
    label: string | null;
    emoji: {
        id: string | null;
        name: string;
        animated: boolean;
    } | null;
    identifier: string | null;
    url: string | null;
    disabled?: boolean;
    constructor(data: import("@amanda/discordtypings").ButtonData, client: import("./Client"));
    get id(): string;
    setStyle(style: "primary" | "secondary" | "success" | "danger" | "link"): this;
    toJSON(): import("@amanda/discordtypings").ButtonData;
    _patch(data: import("@amanda/discordtypings").MessageComponentData): void;
}
export = Button;
