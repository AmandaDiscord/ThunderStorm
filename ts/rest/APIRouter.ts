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

type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];

function buildRoute(manager: import("./RESTManager")): import("../internal").Route {
	const route = [""];
	const handler = {
		get(target: (...args: Array<any>) => any, name: HTTPMethod): (options: import("../internal").RestOptions) => Promise<any> {
			if (reflectors.includes(name)) return () => Promise.resolve(route.join("/"));
			if (methods.includes(name)) {
				const rt = route.join("/");
				// Bucketing is handled by SnowTransfer.
				return (options: import("../internal").RestOptions) =>
					manager.request(
						name,
						rt,
						Object.assign(
							{
								versioned: manager.versioned,
								route: rt
							},
							options
						)
					);
			}
			route.push(name);
			return new Proxy(noop, handler);
		},
		apply(target: (...arg: Array<any>) => any, _: any, args: Array<any>): ProxyConstructor["prototype"] {
			route.push(...args.filter(x => x != null));
			return new Proxy(noop, handler);
		}
	};
	return new Proxy(noop, handler) as unknown as import("../internal").Route;
}

export = buildRoute;
exports.default = buildRoute;
