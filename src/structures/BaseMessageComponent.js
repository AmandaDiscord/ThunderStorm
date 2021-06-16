"use strict";
const errors_1 = require("../errors");
const Constants_1 = require("../util/Constants");
class BaseMessageComponent {
    constructor(data) {
        this.type = "type" in data ? BaseMessageComponent.resolveType(data.type) : null;
    }
    static create(data, client, skipValidation = false) {
        let component;
        let type = data.type;
        if (typeof type === "string")
            type = Constants_1.MessageComponentTypes[type];
        switch (type) {
            case Constants_1.MessageComponentTypes.ACTION_ROW: {
                const MessageActionRow = require("./MessageActionRow");
                component = new MessageActionRow(data);
                break;
            }
            case Constants_1.MessageComponentTypes.BUTTON: {
                const MessageButton = require("./MessageButton");
                component = new MessageButton(data);
                break;
            }
            default:
                if (!skipValidation) {
                    throw new errors_1.TypeError("INVALID_TYPE", "data.type", "valid MessageComponentType");
                }
        }
        return component;
    }
    static resolveType(type) {
        return typeof type === "string" ? type : Constants_1.MessageComponentTypes[type];
    }
}
module.exports = BaseMessageComponent;
