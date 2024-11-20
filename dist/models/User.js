"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_.+-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, 'Please use a valid email address'],
    },
    thoughts: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
