// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
class VoiceRegion {
	public id: string;
	public name: string;
	public vip: boolean;
	public deprecated: boolean;
	public optimal: boolean;
	public custom: boolean;
	public sampleHostname: string;

	public static readonly default = VoiceRegion;

	public constructor(data: { id: string; name: string; vip: boolean; deprecated: boolean; optimal: boolean; custom: boolean; sample_hostname?: string }) {
		this.id = data.id;
		this.name = data.name;
		this.vip = data.vip;
		this.deprecated = data.deprecated;
		this.optimal = data.optimal;
		this.custom = data.custom;
		this.sampleHostname = data.sample_hostname || "";
	}

	public toString() {
		return this.name;
	}

	public toJSON() {
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

export = VoiceRegion;
