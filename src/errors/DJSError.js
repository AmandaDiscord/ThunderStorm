"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const kCode = Symbol("code");
const messages = new Map();
function makeDiscordjsError(Base) {
    var _a;
    return _a = class DiscordjsError extends Base {
            constructor(key, ...args) {
                super(message(key, args));
                this[kCode] = key;
                if (Error.captureStackTrace)
                    Error.captureStackTrace(this, DiscordjsError);
            }
            get name() {
                return `${super.name} [${this[kCode]}]`;
            }
            get code() {
                return this[kCode];
            }
        },
        Symbol.species,
        _a.default = _a,
        _a;
}
function message(key, args) {
    if (typeof key !== "string")
        throw new Error("Error message key must be a string");
    const msg = messages.get(key);
    if (!msg)
        throw new Error(`An invalid error message key was used: ${key}.`);
    if (typeof msg === "function")
        return msg(...args);
    if (args === undefined || args.length === 0)
        return msg;
    args.unshift(msg);
    return String(...args);
}
function register(sym, val) {
    messages.set(sym, typeof val === "function" ? val : String(val));
}
const DJSError = {
    register,
    Error: makeDiscordjsError(Error),
    TypeError: makeDiscordjsError(TypeError),
    RangeError: makeDiscordjsError(RangeError),
    Messages: undefined,
    default: undefined
};
DJSError.default = DJSError;
module.exports = DJSError;
