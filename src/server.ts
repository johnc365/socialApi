import express, { Application } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/socialApiDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
