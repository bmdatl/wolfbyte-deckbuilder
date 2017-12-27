const mongoose = require('mongoose'),
  mongooseSQ = require('mongoose-string-query'),
  timestamp = require('mongoose-timestamp');

const DeckSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    format: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false
    },
    creatures: {
      type: Array,
      required: false
    },
    artifacts: {
      type: Array,
      required: false
    },
    enchantments: {
      type: Array,
      required: false
    },
    instants: {
      type: Array,
      required: false
    },
    sorceries: {
      type: Array,
      required: false
    },
    commanders: {
      type: Array,
      required: false
    },
    lands: {
      type: Array,
      required: false
    },
    planeswalkers: {
      type: Array,
      required: false
    },
  },
{ minimize: false }
);

DeckSchema.plugin(timestamp);
DeckSchema.plugin(mongooseSQ);

const Deck = mongoose.model('Deck', DeckSchema);
module.exports = Deck;
