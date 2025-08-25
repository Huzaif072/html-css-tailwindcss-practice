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
exports.getTasks = exports.addTask = void 0;
const path_1 = __importDefault(require("path"));
const fileHelper_1 = require("../utils/fileHelper");
const taskFile = path_1.default.join(__dirname, "..", "..", "files", "tasks.json");
const addTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = req.body;
        if (!task.title || !task.status || !task.priority) {
            return res.status(400).json({ error: "Missing required fields: title, status, priority" });
        }
        const tasks = yield (0, fileHelper_1.readJsonFile)(taskFile, []);
        tasks.push(task);
        yield (0, fileHelper_1.writeJsonFile)(taskFile, tasks);
        res.status(201).json({ message: "Task added", task });
    }
    catch (err) {
        next(err);
    }
});
exports.addTask = addTask;
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, fileHelper_1.readJsonFile)(taskFile, []);
        res.json(tasks);
    }
    catch (err) {
        next(err);
    }
});
exports.getTasks = getTasks;
