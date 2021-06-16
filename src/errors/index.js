"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const DJSError_1 = __importDefault(require("./DJSError"));
const Messages_1 = __importDefault(require("./Messages"));
DJSError_1.default.Messages = Messages_1.default;
module.exports = DJSError_1.default;
