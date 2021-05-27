import Collection from "./Util/Collection";

class ButtonRow {
	public children: Collection<string, import("./Button")> = new Collection();

	public constructor(children: Array<import("./Button")>) {
		for (const child of children) this.children.set(child.id, child);
	}

	public toJSON() {
		return {
			type: 1 as const,
			components: [...this.children.values()].map(bn => bn.toJSON())
		};
	}
}

export = ButtonRow;
