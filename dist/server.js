"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialApiDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
app.use('/api', routes_1.default);
app.get('/', (_req, res) => {
    res.send('API is running');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
