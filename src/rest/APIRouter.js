"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const noop = () => { void 0; };
const methods = ["get", "post", "delete", "patch", "put"];
const reflectors = [
    "toString",
    "valueOf",
    "inspect",
    "constructor",
    Symbol.toPrimitive,
    Symbol.for("nodejs.util.inspect.custom")
];
function buildRoute(manager) {
    const route = [""];
    const handler = {
        get(target, name) {
            if (reflectors.includes(name))
                return () => Promise.resolve(route.join("/"));
            if (methods.includes(name)) {
                const rt = route.join("/");
                // Bucketing is handled by SnowTransfer.
                return (options) => manager.request(name, rt, Object.assign({
                    versioned: manager.versioned,
                    route: rt
                }, options));
            }
            route.push(name);
            return new Proxy(noop, handler);
        },
        apply(target, _, args) {
            route.push(...args.filter(x => x != null));
            return new Proxy(noop, handler);
        }
    };
    return new Proxy(noop, handler);
}
exports.default = buildRoute;
module.exports = buildRoute;
