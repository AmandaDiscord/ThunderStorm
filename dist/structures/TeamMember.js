"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const User_1 = __importDefault(require("./User"));
class TeamMember extends Base_1.default {
    constructor(team, data) {
        var _a, _b;
        super({ id: data.user.id }, team.client);
        this.permissions = ["*"];
        this.team = team;
        if (data.permissions)
            this.permissions = data.permissions;
        if (!this.membershipState || data.membership_state)
            this.membershipState = data.membership_state === 1 ? "INVITED" : "ACCEPTED";
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(data.user, this.client);
        }
    }
    toString() {
        return this.user.toString();
    }
    toJSON() {
        return {
            id: this.id,
            team_id: this.team.id,
            membership_state: this.membershipState === "INVITED" ? 1 : 2,
            permissions: this.permissions,
            user: this.user.toJSON()
        };
    }
    _patch(data) {
        var _a, _b;
        if (data.permissions)
            this.permissions = data.permissions;
        if (!this.membershipState || data.membership_state)
            this.membershipState = data.membership_state === 1 ? "INVITED" : "ACCEPTED";
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(data.user, this.client);
        }
        super._patch(data);
    }
}
module.exports = TeamMember;
