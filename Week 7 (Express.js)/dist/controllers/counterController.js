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
exports.incrementCounter = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const countFile = path_1.default.join(__dirname, "..", "..", "files", "count.txt");
const incrementCounter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = 0;
        try {
            const data = yield fs_1.promises.readFile(countFile, "utf-8");
            count = parseInt(data) || 0;
        }
        catch (_a) {
            count = 0;
        }
        count++;
        yield fs_1.promises.writeFile(countFile, count.toString());
        res.json({ count });
    }
    catch (err) {
        next(err);
    }
});
exports.incrementCounter = incrementCounter;
