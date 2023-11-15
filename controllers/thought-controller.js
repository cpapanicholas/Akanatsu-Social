const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .sort({ createdAt: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: thoughtData.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought and associated user data deleted successfully!' });
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;