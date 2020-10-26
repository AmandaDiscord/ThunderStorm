declare class VoiceRegion {
    id: string;
    name: string;
    vip: boolean;
    deprecated: boolean;
    optimal: boolean;
    custom: boolean;
    sampleHostname: string;
    constructor(data: any);
    toString(): string;
    toJSON(): {
        id: string;
        name: string;
        vip: boolean;
        deprecated: boolean;
        optimal: boolean;
        custom: boolean;
        sample_hostname: string;
    };
}
export = VoiceRegion;
