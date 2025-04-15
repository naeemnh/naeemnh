import { model, models, Schema } from "mongoose";

const MatchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  stageId: {
    type: Schema.Types.ObjectId,
    ref: "TournamentStage",
    required: true,
  },
  matchNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: String,
  venue: String,
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  homeTeamScore: Number,
  awayTeamScore: Number,
  duration: Number, // in minutes
  referees: [String],
  linesmen: [String],
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "postponed", "cancelled"],
    default: "scheduled",
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  sets: [
    {
      type: Schema.Types.ObjectId,
      ref: "MatchSet",
    },
  ],
  statistics: {
    homeTeam: {
      attacks: Number,
      blocks: Number,
      serves: Number,
      digs: Number,
      faults: Number,
    },
    awayTeam: {
      attacks: Number,
      blocks: Number,
      serves: Number,
      digs: Number,
      faults: Number,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

MatchSchema.index({ tournanamentId: 1 });
MatchSchema.index({ stageId: 1 });
MatchSchema.index({ homeTeam: 1, awayTeam: 1 });
MatchSchema.index({ date: 1 });

export default models.Match || model("Match", MatchSchema);
