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

function buildRoute(manager: import("./RESTManager")): any {
	const route = [""];
	const handler = {
		get(target: (...args: Array<any>) => any, name: HTTPMethod): (options: any) => Promise<any> {
			if (reflectors.includes(name)) return () => Promise.resolve(route.join("/"));
			if (methods.includes(name)) {
				const routeBucket: Array<string> = [];
				for (let i = 0; i < route.length; i++) {
					// Reactions routes and sub-routes all share the same bucket
					if (route[i - 1] === "reactions") break;
					// Literal IDs should only be taken account if they are the Major ID (the Channel/Guild ID)
					if (/\d{16,19}/g.test(route[i]) && !/channels|guilds/.test(route[i - 1])) routeBucket.push(":id");
					// All other parts of the route should be considered as part of the bucket identifier
					else routeBucket.push(route[i]);
				}
				return (options: any) =>
					manager.request(
						name,
						route.join("/"),
						Object.assign(
							{
								versioned: manager.versioned,
								route: routeBucket.join("/")
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
	return new Proxy(noop, handler);
}

export = buildRoute;
