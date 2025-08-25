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
exports.greeting = exports.home = void 0;
const home = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.type("text/plain").send("Hello Node!");
    }
    catch (err) {
        next(err);
    }
});
exports.home = home;
const greeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = process.env.NAME || "Guest";
        res.json({ greeting: `Hello, ${name} ` });
    }
    catch (err) {
        next(err);
    }
});
exports.greeting = greeting;
