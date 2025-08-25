"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileMessage = exports.readFileMessage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const messageFile = path_1.default.join(__dirname, "..", "..", "files", "message.txt");
const logFile = path_1.default.join(__dirname, "..", "..", "files", "log.txt");
const readFileMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(messageFile, "utf-8");
        res.type("text/plain").send(data);
    }
    catch (err) {
        next(err);
    }
});
exports.readFileMessage = readFileMessage;
const writeFileMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.query.msg;
    if (!message) {
        return res.status(400).json({ error: "Please provide ?msg=yourText" });
    }
    try {
        yield fs_1.promises.appendFile(logFile, message + "\n");
        res.json({ message: `Message saved: ${message}` });
    }
    catch (err) {
        next(err);
    }
});
exports.writeFileMessage = writeFileMessage;
