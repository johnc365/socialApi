"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware to parse JSON
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialApiDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
// Basic route for testing server
app.get('/', (req, res) => {
    res.send('API is running');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
