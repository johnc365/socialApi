import express, { Application } from 'express';
import mongoose from 'mongoose';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/socialApiDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});