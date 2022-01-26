"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class UserUpdateAction extends Action_1.default {
    handle(data) {
        var _a, _b;
        const User = require("../../structures/User");
        const user = data.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User(this.client, data);
        if (data.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id))
            this.client.user._patch(data);
        this.client.emit(Constants_1.Events.USER_UPDATE, user);
        return {
            old: null,
            updated: user
        };
    }
}
UserUpdateAction.default = UserUpdateAction;
module.exports = UserUpdateAction;
