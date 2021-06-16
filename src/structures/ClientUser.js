"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const centra_1 = __importDefault(require("centra"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("./User"));
class ClientUser extends User_1.default {
    constructor(client, data) {
        super(client, data);
        this.mfaEnabled = false;
        if (data.mfa_enabled !== undefined)
            this.mfaEnabled = data.mfa_enabled;
    }
    get verified() {
        return this.flags.has("VERIFIED_BOT");
    }
    async edit(data) {
        let buf;
        if (typeof data.avatar === "string" && data.avatar.startsWith("http"))
            buf = await centra_1.default(data.avatar, "get").header("User-Agent", "").send().then(d => d.body ? d.body : undefined);
        else if (typeof data.avatar === "string")
            buf = await fs_1.default.promises.readFile(path_1.default.isAbsolute(data.avatar) ? data.avatar : path_1.default.join(process.cwd(), data.avatar));
        else
            buf = data.avatar;
        const payload = {};
        if (buf)
            Object.assign(payload, { avatar: buf });
        if (data.username)
            Object.assign(payload, { username: data.username });
        if (Object.keys(payload).length === 0)
            throw new Error("Invalid Update self payload. Missing username or avatar properties");
        const newdata = await this.client._snow.user.updateSelf(payload);
        this._patch(newdata);
        return this;
    }
    _patch(data) {
        if (data.mfa_enabled !== undefined)
            this.mfaEnabled = data.mfa_enabled;
        super._patch(data);
    }
}
module.exports = ClientUser;
