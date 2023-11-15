const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../controllers/reaction-controller');

// Route to create a reaction for a thought
router.route('/:thoughtId/reactions').post(createReaction);

// Route to delete a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;