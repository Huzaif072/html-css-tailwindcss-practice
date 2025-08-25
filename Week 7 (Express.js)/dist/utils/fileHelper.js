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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonFile = readJsonFile;
exports.writeJsonFile = writeJsonFile;
const fs_1 = require("fs");
function readJsonFile(filePath, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile(filePath, "utf-8");
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : defaultValue;
        }
        catch (err) {
            if (err.code === "ENOENT") {
                return defaultValue;
            }
            throw err;
        }
    });
}
function writeJsonFile(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    });
}
