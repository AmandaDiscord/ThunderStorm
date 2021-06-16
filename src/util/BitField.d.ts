interface BitFieldConstructor {
    new <T>(bits: import("../Types").BitFieldResolvable<T>): BitField<T>;
    readonly prototype: BitField<unknown>;
    readonly [Symbol.species]: BitFieldConstructor;
}
declare class BitField<T> {
    ["constructor"]: typeof BitField;
    static readonly default: typeof BitField;
    readonly [Symbol.species]: BitFieldConstructor;
    static FLAGS: {
        [flag: string]: bigint;
    };
    FLAGS: {
        [flag: string]: bigint;
    };
    bitfield: bigint;
    constructor(bits: import("../Types").BitFieldResolvable<T>);
    any(bit: import("../Types").BitFieldResolvable<T>): boolean;
    equals(bit: import("../Types").BitFieldResolvable<T>): boolean;
    has(bit: import("../Types").BitFieldResolvable<T>): boolean;
    missing(bits: import("../Types").BitFieldResolvable<T>): Array<keyof T>;
    freeze(): Readonly<this>;
    add(...bits: Array<import("../Types").BitFieldResolvable<T>>): this;
    remove(...bits: Array<import("../Types").BitFieldResolvable<T>>): this;
    serialize(): {
        [flag: string]: boolean;
    };
    toArray(): Array<keyof T>;
    toJSON(): {
        bitfield: bigint;
    };
    valueOf(): bigint;
    [Symbol.iterator](): Generator<keyof T, void, undefined>;
    static resolve(bit?: import("../Types").BitFieldResolvable<any>): bigint;
}
export = BitField;
