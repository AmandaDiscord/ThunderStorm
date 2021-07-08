import { parse } from "path";
import fetch from "centra";
import STEndpoints from "snowtransfer/dist/Endpoints";

import { Colors, Endpoints } from "./Constants";
import { Error as DiscordError, RangeError, TypeError } from "../errors";
const has = <T>(o: T, k: keyof T) => Object.prototype.hasOwnProperty.call(o, k);
const isObject = (d: any) => typeof d === "object" && d !== null;

type FlattenIfArray<T> = T extends Array<infer R> ? R : T;

class Util {
	public constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	public static flatten(obj: any, ...props: Array<{ [s: string]: boolean | string; }>): any {
		if (!isObject(obj)) return obj;

		const objProps = Object.keys(obj)
			.filter(k => !k.startsWith("_"))
			.map(k => ({ [k]: true }));

		// @ts-ignore
		props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);

		const out = {};

		// eslint-disable-next-line prefer-const
		for (let [prop, newProp] of Object.entries(props)) {
			if (!newProp) continue;
			// @ts-ignore
			newProp = newProp === true ? prop : newProp;

			const element = obj[prop];
			const elemIsObj = isObject(element);
			const valueOf = elemIsObj && typeof element.valueOf === "function" ? element.valueOf() : null;

			// If it's an array, flatten each element
			// @ts-ignore
			if (Array.isArray(element)) out[newProp] = element.map(e => flatten(e));
			// If it's an object with a primitive `valueOf`, use that value
			// @ts-ignore
			else if (typeof valueOf !== "object") out[newProp] = valueOf;
			// If it's a primitive
			// @ts-ignore
			else if (!elemIsObj) out[newProp] = element;
		}

		return out;
	}

	public static splitMessage(text: string, { maxLength = 2000, char = "\n" as string | RegExp, prepend = "", append = "" } = {}) {
		// @ts-ignore
		text = Util.verifyString(text, RangeError, "MESSAGE_CONTENT_TYPE", false);
		if (text.length <= maxLength) return [text];
		const splitText = text.split(char);
		if (splitText.some(elem => elem.length > maxLength)) throw new RangeError("SPLIT_MAX_LEN");
		const messages = [];
		let msg = "";
		for (const chunk of splitText) {
			if (msg && (msg + char + chunk + append).length > maxLength) {
				messages.push(msg + append);
				msg = prepend;
			}
			msg += (msg && msg !== prepend ? char : "") + chunk;
		}
		return messages.concat(msg).filter(m => m);
	}

	public static escapeMarkdown(
		text: string,
		{
			codeBlock = true,
			inlineCode = true,
			bold = true,
			italic = true,
			underline = true,
			strikethrough = true,
			spoiler = true,
			codeBlockContent = true,
			inlineCodeContent = true
		} = {}
	): string {
		if (!codeBlockContent) {
			return text
				.split("```")
				.map((subString, index, array) => {
					if (index % 2 && index !== array.length - 1) return subString;
					return Util.escapeMarkdown(subString, {
						inlineCode,
						bold,
						italic,
						underline,
						strikethrough,
						spoiler,
						inlineCodeContent
					});
				})
				.join(codeBlock ? "\\`\\`\\`" : "```");
		}
		if (!inlineCodeContent) {
			return text
				.split(/(?<=^|[^`])`(?=[^`]|$)/g)
				.map((subString, index, array) => {
					if (index % 2 && index !== array.length - 1) return subString;
					return Util.escapeMarkdown(subString, {
						codeBlock,
						bold,
						italic,
						underline,
						strikethrough,
						spoiler
					});
				})
				.join(inlineCode ? "\\`" : "`");
		}
		if (inlineCode) text = Util.escapeInlineCode(text);
		if (codeBlock) text = Util.escapeCodeBlock(text);
		if (italic) text = Util.escapeItalic(text);
		if (bold) text = Util.escapeBold(text);
		if (underline) text = Util.escapeUnderline(text);
		if (strikethrough) text = Util.escapeStrikethrough(text);
		if (spoiler) text = Util.escapeSpoiler(text);
		return text;
	}

	public static escapeCodeBlock(text: string): string {
		return text.replace(/```/g, "\\`\\`\\`");
	}

	public static escapeInlineCode(text: string) {
		return text.replace(/(?<=^|[^`])`(?=[^`]|$)/g, "\\`");
	}

	public static escapeItalic(text: string) {
		let i = 0;
		text = text.replace(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
			if (match === "**") return ++i % 2 ? `\\*${match}` : `${match}\\*`;
			return `\\*${match}`;
		});
		i = 0;
		return text.replace(/(?<=^|[^_])_([^_]|__|$)/g, (_, match) => {
			if (match === "__") return ++i % 2 ? `\\_${match}` : `${match}\\_`;
			return `\\_${match}`;
		});
	}

	public static escapeBold(text: string) {
		let i = 0;
		return text.replace(/\*\*(\*)?/g, (_, match) => {
			if (match) return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
			return "\\*\\*";
		});
	}

	public static escapeUnderline(text: string) {
		let i = 0;
		return text.replace(/__(_)?/g, (_, match) => {
			if (match) return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
			return "\\_\\_";
		});
	}

	public static escapeStrikethrough(text: string) {
		return text.replace(/~~/g, "\\~\\~");
	}

	public static escapeSpoiler(text: string) {
		return text.replace(/\|\|/g, "\\|\\|");
	}

	static async fetchRecommendedShards(token: string, guildsPerShard = 1000): Promise<number> {
		if (!token) throw new DiscordError("TOKEN_MISSING");
		const res = await fetch(STEndpoints.BASE_HOST + STEndpoints.BASE_URL + Endpoints.botGateway, "get").header("Authorization", `Bot ${token.replace(/^Bot\s*/i, "")}`).send();
		if (res.statusCode === 200) return res.json().then(data => data.shards * (1000 / guildsPerShard));
		if (res.statusCode === 401) throw new DiscordError("TOKEN_INVALID");
		throw res;
	}

	static parseEmoji(text: string) {
		if (text.includes("%")) text = decodeURIComponent(text);
		if (!text.includes(":")) return { animated: false, name: text, id: null };
		const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
		if (!m) return null;
		return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
	}

	static resolvePartialEmoji(emoji: import("../Types").EmojiIdentifierResolvable): { id: string | null; name?: string; animated?: boolean } | null {
		if (!emoji) return null;
		if (typeof emoji === "string") return /^\d{17,19}$/.test(emoji) ? { id: emoji } : Util.parseEmoji(emoji);
		const { id, name, animated } = emoji;
		if (!id && !name) return null;
		return { id, name, animated };
	}

	static cloneObject<T>(obj: T): T {
		return Object.assign(Object.create(obj as any), obj);
	}

	static mergeDefault<D extends Record<any, any>, T extends Record<any, any>>(def: D, given?: T): D | D & T {
		if (!given) return def;
		for (const key in def) {
			if (!has(given, key) || given[key] === undefined) {
				given[key] = def[key];
			} else if (given[key] === Object(given[key])) {
				given[key] = Util.mergeDefault(def[key], given[key]);
			}
		}

		return given;
	}

	static makeError(obj: { name: string; message: string; stack: string }) {
		const err = new Error(obj.message);
		err.name = obj.name;
		err.stack = obj.stack;
		return err;
	}

	static makePlainError(err: Error) {
		return {
			name: err.name,
			message: err.message,
			stack: err.stack
		};
	}

	static moveElementInArray<T extends Array<any>>(array: T, element: FlattenIfArray<T>, newIndex: number, offset = false) {
		const index = array.indexOf(element);
		newIndex = (offset ? index : 0) + newIndex;
		if (newIndex > -1 && newIndex < array.length) {
			const removedElement = array.splice(index, 1)[0];
			array.splice(newIndex, 0, removedElement);
		}
		return array.indexOf(element);
	}

	static verifyString(
		data: string,
		error = Error,
		errorMessage = `Expected a string, got ${data} instead.`,
		allowEmpty = true
	) {
		if (typeof data !== "string") throw new error(errorMessage);
		if (!allowEmpty && data.length === 0) throw new error(errorMessage);
		return data;
	}

	static resolveColor(color: import("../Types").ColorResolvable | undefined): number {
		if (typeof color === "string") {
			if (color === "RANDOM") return Math.floor(Math.random() * (0xffffff + 1));
			if (color === "DEFAULT") return 0;
			color = Colors[color] || parseInt(color.replace("#", ""), 16);
		} else if (Array.isArray(color)) {
			color = (color[0] << 16) + (color[1] << 8) + color[2];
		}

		if ((color && color < 0) || (color && color > 0xffffff)) throw new RangeError("COLOR_RANGE");
		else if (color && isNaN(color)) throw new TypeError("COLOR_CONVERT");

		return color || 0;
	}

	static discordSort<T extends import("./Collection")<any, any>>(collection: T) {
		return collection.sorted(
			(a, b) =>
				a.rawPosition - b.rawPosition ||
				parseInt(b.id.slice(0, -10)) - parseInt(a.id.slice(0, -10)) ||
				parseInt(b.id.slice(10)) - parseInt(a.id.slice(10))
		);
	}

	static setPosition(item: import("../structures/Channel") | import("../structures/Role"), position: number, relative: boolean, sorted: import("./Collection")<string, import("../structures/Channel") | import("../structures/Role")>, route: any, reason?: string): Promise<Array<any>> {
		let updatedItems = sorted.array();
		Util.moveElementInArray(updatedItems, item, position, relative);
		// @ts-ignore
		updatedItems = updatedItems.map((r, i) => ({ id: r.id, position: i }));
		return route.patch({ data: updatedItems, reason }).then(() => updatedItems);
	}

	static basename(path: string, ext?: string): string {
		const res = parse(path);
		return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
	}

	static idToBinary(num: string): string {
		let bin = "";
		let high = parseInt(num.slice(0, -10)) || 0;
		let low = parseInt(num.slice(-10));
		while (low > 0 || high > 0) {
			bin = String(low & 1) + bin;
			low = Math.floor(low / 2);
			if (high > 0) {
				low += 5000000000 * (high % 2);
				high = Math.floor(high / 2);
			}
		}
		return bin;
	}

	static binaryToID(num: string): string {
		let dec = "";

		while (num.length > 50) {
			const high = parseInt(num.slice(0, -32), 2);
			const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

			dec = (low % 10).toString() + dec;
			num =
				Math.floor(high / 10).toString(2) +
				Math.floor(low / 10)
					.toString(2)
					.padStart(32, "0");
		}

		// @ts-ignore
		num = parseInt(num, 2);
		// @ts-ignore
		while (num > 0) {
			// @ts-ignore
			dec = (num % 10).toString() + dec;
			// @ts-ignore
			num = Math.floor(num / 10);
		}

		return dec;
	}

	static removeMentions(str: string) {
		return str.replace(/@/g, "@\u200b");
	}

	static cleanContent(str: string, message: import("../structures/Message")) {
		let string = str
			.replace(/<@!?\d+>/g, input => {
				const id = input.replace(/<|!|>|@/g, "");
				const member = message.mentions.members.get(id);
				if (member) {
					return Util.removeMentions(`@${member.displayName}`);
				} else {
					const user = message.mentions.users.get(id);
					return user ? Util.removeMentions(`@${user.username}`) : input;
				}
			})
			.replace(/<#\d+>/g, () => {
				return "#deleted-channel";
			})
			.replace(/<@&\d+>/g, input => {
				const id = input.replace(/<|!|>|@|&/g, "");
				const member = message.mentions.members.find(m => m.roles.has(id)) || (message.member && message.member.roles.has(id) ? message.member : null);
				return `@${member ? member.roles.get(id)?.name || "deleted-role" : "deleted-role"}`;
			});
		if (message.client.options.disableEveryone) {
			string = string.replace(/@([^<>@ ]*)/gmsu, (match, target) => {
				if (target.match(/^[&!]?\d+$/)) {
					return `@${target}`;
				} else {
					return `@\u200b${target}`;
				}
			});
		}
		return string;
	}

	static cleanCodeBlockContent(text: string) {
		return text.replace(/```/g, "`\u200b``");
	}

	static delayFor(ms: number): Promise<void> {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
}

export = Util;
