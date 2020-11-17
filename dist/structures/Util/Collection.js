"use strict";
const Immutable = require("@augu/immutable");
class Collection extends Immutable.Collection {
    constructor(from) {
        super(from);
    }
}
module.exports = Collection;
