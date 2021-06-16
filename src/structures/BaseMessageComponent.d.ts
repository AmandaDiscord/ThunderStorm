declare class BaseMessageComponent {
    type: import("../Types").MessageComponentType | null;
    constructor(data: BaseMessageComponent | import("../Types").BaseMessageComponentOptions);
    static create(data: import("../Types").MessageComponentOptions, client?: import("../client/Client") | import("../client/WebhookClient") | null, skipValidation?: boolean): import("../Types").MessageComponent;
    static resolveType(type: import("../Types").MessageComponentTypeResolvable): import("../Types").MessageComponentType;
}
export = BaseMessageComponent;
