import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.status(200).json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID!' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
