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
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User_1.default.create(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteUser = deleteUser;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addFriend = addFriend;
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeFriend = removeFriend;
