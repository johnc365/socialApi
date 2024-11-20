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
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const Thought_1 = __importDefault(require("./models/Thought"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialApiDB')
    .then(() => {
    console.log('Connected to MongoDB');
    runSeed();
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.deleteMany({});
        yield Thought_1.default.deleteMany({});
        const users = yield User_1.default.insertMany([
            { username: 'user1', email: 'user1@gmail.com' },
            { username: 'user2', email: 'user2@gmail.com' },
            { username: 'user3', email: 'user3@gmail.com' },
        ]);
        console.log('Users created:', users);
        const thought = yield Thought_1.default.create({
            thoughtText: 'This is the first seeded thought!',
            username: users[0].username,
        });
        yield User_1.default.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thought._id } });
        console.log('Thought created and linked to user1:', thought);
        mongoose_1.default.connection.close();
        console.log('Seed complete, MongoDB connection closed');
    }
    catch (err) {
        console.error('Seed failed:', err);
        mongoose_1.default.connection.close();
    }
});
