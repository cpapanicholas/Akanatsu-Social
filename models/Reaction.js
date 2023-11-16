const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toDateString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

module.exports = reactionSchema;