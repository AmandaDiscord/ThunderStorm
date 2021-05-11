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
    /**
     * Checks whether the bitfield has a bit, or any of multiple bits.
     * @param bit Bit(s) to check for
     */
    any(bit: import("../Types").BitFieldResolvable<T>): boolean;
    /**
     * Checks if this bitfield equals another
     * @param bit Bit(s) to check for
     */
    equals(bit: import("../Types").BitFieldResolvable<T>): boolean;
    /**
     * Checks whether the bitfield has a bit, or multiple bits.
     * @param bit Bit(s) to check for
     */
    has(bit: import("../Types").BitFieldResolvable<T>): boolean;
    /**
     * Gets all given bits that are missing from the bitfield.
     * @param bits Bit(s) to check for
     */
    missing(bits: import("../Types").BitFieldResolvable<T>): (keyof T)[];
    /**
     * Freezes these bits, making them immutable.
     * @returns These bits
     */
    freeze(): Readonly<this>;
    /**
     * Adds bits to these ones.
     * @param bits Bits to add
     * @returns These bits or new BitField if the instance is frozen.
     */
    add(...bits: Array<import("../Types").BitFieldResolvable<T>>): this;
    /**
     * Removes bits from these.
     * @param bits Bits to remove
     * @returns These bits or new BitField if the instance is frozen.
     */
    remove(...bits: Array<import("../Types").BitFieldResolvable<T>>): this;
    /**
     * Gets an object mapping field names to a {@link boolean} indicating whether the
     * bit is available.
     * @param Additional parameters for the has method, if any
     */
    serialize(): {
        [flag: string]: boolean;
    };
    /**
     * Gets an {@link Array} of bitfield names based on the bits available.
     */
    toArray(): Array<keyof T>;
    toJSON(): {
        bitfield: bigint;
    };
    valueOf(): bigint;
    [Symbol.iterator](): Generator<keyof T, void, undefined>;
    /**
     * Resolves bitfields to their numeric form.
     * @param bit - bit(s) to resolve
     */
    static resolve(bit?: import("../Types").BitFieldResolvable<any>): bigint;
}
export = BitField;
