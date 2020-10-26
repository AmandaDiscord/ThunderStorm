"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User_1 = __importDefault(require("./User"));
class ClientUser extends User_1.default {
    constructor(data, client) {
        super(data, client);
    }
}
module.exports = ClientUser;
