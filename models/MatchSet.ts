import { model, models, Schema } from "mongoose";

const MatchSetSchema = new Schema({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  setNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  homeTeamScore: {
    type: Number,
    min: 0,
    max: 30,
  },
  awayTeamScore: {
    type: Number,
    min: 0,
    max: 30,
  },
  duration: Number, // in minutes
  startTime: Date,
  endTime: Date,
  homeTeamTimeouts: {
    type: Number,
    min: 0,
    max: 2,
  },
  awayTeamTimeouts: {
    type: Number,
    min: 0,
    max: 2,
  },
  homeTeamSubstitutions: {
    type: Number,
    min: 0,
    max: 6,
  },
  awayTeamSubstitutions: {
    type: Number,
    min: 0,
    max: 6,
  },
  keyPlays: [
    {
      type: {
        type: String,
        enum: ["point", "timeout", "substitution", "challenge", "violation"],
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
      player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      timestamp: Date,
      description: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

MatchSetSchema.index({ matchId: 1 });
MatchSetSchema.index({ matchId: 1, setNumber: 1 });

export default models.MatchSet || model("MatchSet", MatchSetSchema);
