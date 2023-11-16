const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller' );
  

// Route to get all thoughts and create a new thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Route to get a single thought by ID, update a thought by ID, and delete a thought by ID
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Route to create a reaction for a thought
router.route('/:thoughtId/reactions').post(createReaction);

// Route to delete a reaction from a thought
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;