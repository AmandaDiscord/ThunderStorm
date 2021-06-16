import fs from "fs";
import path from "path";
import stream from "stream";
import fetch from "centra";
import { Error as DiscordError, TypeError } from "../errors";
import Invite from "../structures/Invite";

class DataResolver {
	constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	static resolveCode(data: string, regex: RegExp): string {
		return data.matchAll(regex).next().value?.[1] ?? data;
	}

	static resolveInviteCode(data: string): string {
		return this.resolveCode(data, Invite.INVITES_PATTERN);
	}

	static async resolveImage(image?: import("../Types").BufferResolvable): Promise<string | null> {
		if (!image) return null;
		if (typeof image === "string" && image.startsWith("data:")) {
			return image;
		}
		const file = await this.resolveFileAsBuffer(image);
		return DataResolver.resolveBase64(file);
	}

	static resolveBase64(data: Buffer | string): string {
		if (Buffer.isBuffer(data)) return `data:image/jpg;base64,${data.toString("base64")}`;
		return data;
	}

	static async resolveFile(resource: Buffer | string | stream.Stream | import("../Types").FileOptions | import("../structures/MessageAttachment")): Promise<Buffer | stream.Stream> {
		if (Buffer.isBuffer(resource) || resource instanceof stream.Readable) return resource;
		if (typeof resource === "string") {
			if (/^https?:\/\//.test(resource)) {
				const res = await fetch(resource).send();
				return res.body;
			}

			return new Promise((resolve, reject) => {
				const file = path.resolve(resource);
				fs.stat(file, (err, stats) => {
					if (err) return reject(err);
					if (!stats.isFile()) return reject(new DiscordError("FILE_NOT_FOUND", file));
					return resolve(fs.createReadStream(file));
				});
			});
		}

		throw new TypeError("REQ_RESOURCE_TYPE");
	}

	static async resolveFileAsBuffer(resource: import("../Types").BufferResolvable | stream.Stream): Promise<Buffer> {
		const file = await this.resolveFile(resource);
		if (Buffer.isBuffer(file)) return file;

		const buffers = [];
		// @ts-ignore
		for await (const data of file) buffers.push(data);
		return Buffer.concat(buffers);
	}
}

export = DataResolver;
