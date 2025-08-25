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
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const path_1 = __importDefault(require("path"));
const fileHelper_1 = require("../utils/fileHelper");
const usersPath = path_1.default.join(__dirname, "..", "..", "files", "users.json");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.name || !user.email) {
            return res.status(400).json({ error: "Missing required fields: name, email" });
        }
        const users = yield (0, fileHelper_1.readJsonFile)(usersPath, []);
        const existingUser = users.find((u) => u.name === user.name);
        if (existingUser) {
            return res.status(409).json({ error: "User with this name already exists" });
        }
        users.push(user);
        yield (0, fileHelper_1.writeJsonFile)(usersPath, users);
        res.status(201).json({ message: "User saved!", user });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, fileHelper_1.readJsonFile)(usersPath, []);
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        if (!name)
            return res.status(400).json({ error: "Please provide ?name=userName" });
        const users = yield (0, fileHelper_1.readJsonFile)(usersPath, []);
        const user = users.find((u) => u.name === name);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        if (!name)
            return res.status(400).json({ error: "Please provide ?name=userName" });
        let users = yield (0, fileHelper_1.readJsonFile)(usersPath, []);
        const filtered = users.filter((u) => u.name !== name);
        if (filtered.length === users.length) {
            return res.status(404).json({ error: "User not found" });
        }
        yield (0, fileHelper_1.writeJsonFile)(usersPath, filtered);
        res.json({ message: `User ${name} deleted` });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const updatedUser = req.body;
        if (!name)
            return res.status(400).json({ error: "Please provide ?name=ExistingName to update" });
        let users = yield (0, fileHelper_1.readJsonFile)(usersPath, []);
        const index = users.findIndex((u) => u.name === name);
        if (index === -1)
            return res.status(404).json({ error: "User not found" });
        users[index] = Object.assign(Object.assign({}, users[index]), updatedUser);
        yield (0, fileHelper_1.writeJsonFile)(usersPath, users);
        res.json({ message: `User ${name} updated`, user: users[index] });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
