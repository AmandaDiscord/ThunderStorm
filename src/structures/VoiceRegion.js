"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
class VoiceRegion {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.vip = data.vip;
        this.deprecated = data.deprecated;
        this.optimal = data.optimal;
        this.custom = data.custom;
        this.sampleHostname = data.sample_hostname || "";
    }
    toString() {
        return this.name;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            vip: this.vip,
            deprecated: this.deprecated,
            optimal: this.optimal,
            custom: this.custom,
            sample_hostname: this.sampleHostname
        };
    }
}
VoiceRegion.default = VoiceRegion;
module.exports = VoiceRegion;
