"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Application_1 = __importDefault(require("./Application"));
const Team_1 = __importDefault(require("./Team"));
const User_1 = __importDefault(require("./User"));
class ClientApplication extends Application_1.default {
    constructor(data, client) {
        super(data, client);
        this.owner = null;
        if (data.cover_image !== undefined)
            this.cover = data.cover_image;
        if (!this.rpcOrigins || data.rpc_origins !== undefined)
            this.rpcOrigins = data.rpc_origins || [];
        if (!this.botRequiredCodeGrant || data.bot_require_code_grant !== undefined)
            this.botRequiredCodeGrant = data.bot_require_code_grant || false;
        if (!this.botPublic || data.bot_public !== undefined)
            this.botPublic = data.bot_public === false ? false : true;
        if (!this.owner || data.team || data.owner)
            this.owner = data.team ? new Team_1.default(data.team, this.client) : data.owner ? new User_1.default(data.owner, this.client) : null;
    }
    toJSON() {
        // @ts-ignore
        const value = Object.assign(super.toJSON(), {
            rpc_origins: this.rpcOrigins,
            bot_require_code_grant: this.botRequiredCodeGrant,
            bot_public: this.botPublic
        });
        if (this.owner instanceof Team_1.default)
            value["team"] = this.owner.toJSON();
        else if (this.owner)
            value["owner"] = this.owner.toJSON();
        return value;
    }
    _patch(data) {
        if (data.cover_image !== undefined)
            this.cover = data.cover_image;
        if (!this.rpcOrigins || data.rpc_origins !== undefined)
            this.rpcOrigins = data.rpc_origins || [];
        if (!this.botRequiredCodeGrant || data.bot_require_code_grant !== undefined)
            this.botRequiredCodeGrant = data.bot_require_code_grant || false;
        if (!this.botPublic || data.bot_public !== undefined)
            this.botPublic = data.bot_public === false ? false : true;
        if (!this.owner || data.team || data.owner)
            this.owner = data.team ? new Team_1.default(data.team, this.client) : data.owner ? new User_1.default(data.owner, this.client) : null;
        super._patch(data);
    }
}
module.exports = ClientApplication;
