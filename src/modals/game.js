import mongoose, { Schema, models } from 'mongoose';

// Player Result Schema
const playerResultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  maalPoints: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isWinner: {
    type: Boolean,
    default: false,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Round Schema
const roundSchema = new Schema({
  roundNumber: {
    type: Number,
    required: true,
  },
  playerResults: [playerResultSchema], // Each round contains results for all players
});

// Game Schema
const gameSchema = new Schema(
  {
    gameName: {
      type: String, // No required: true here
      required: true, // Default value can be null
    },
    rounds: [roundSchema], // Array of rounds
    roundsPlayed: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'], // Track game status
      default: 'ongoing',
      
    },
  },
  { timestamps: true }
);



const Game = models.Game || mongoose.model('Game', gameSchema);
export default Game;
