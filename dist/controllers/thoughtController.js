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
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
const getAllThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.default.find({});
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllThoughts = getAllThoughts;
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughtById = getThoughtById;
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield Thought_1.default.create(req.body);
        yield User_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createThought = createThought;
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.status(200).json(updatedThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateThought = updateThought;
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield Thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.status(200).json({ message: 'Thought deleted successfully!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addReaction = addReaction;
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
