import mongoose from 'mongoose';
import User from './models/User';
import Thought from './models/Thought';

mongoose.connect('mongodb://127.0.0.1:27017/socialApiDB')
  .then(() => {
    console.log('Connected to MongoDB');
    runSeed();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const runSeed = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany([
      { username: 'user1', email: 'user1@gmail.com' },
      { username: 'user2', email: 'user2@gmail.com' },
      { username: 'user3', email: 'user3@gmail.com' },
    ]);

    console.log('Users created:', users);

    const thought = await Thought.create({
      thoughtText: 'This is the first seeded thought!',
      username: users[0].username,
    });

    await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thought._id } });

    console.log('Thought created and linked to user1:', thought);

    mongoose.connection.close();
    console.log('Seed complete, MongoDB connection closed');
  } catch (err) {
    console.error('Seed failed:', err);
    mongoose.connection.close();
  }
};
