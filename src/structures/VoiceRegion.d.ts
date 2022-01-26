declare class VoiceRegion {
    id: string;
    name: string;
    vip: boolean;
    deprecated: boolean;
    optimal: boolean;
    custom: boolean;
    sampleHostname: string;
    static readonly default: typeof VoiceRegion;
    constructor(data: {
        id: string;
        name: string;
        vip: boolean;
        deprecated: boolean;
        optimal: boolean;
        custom: boolean;
        sample_hostname?: string;
    });
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
