import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID!' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
