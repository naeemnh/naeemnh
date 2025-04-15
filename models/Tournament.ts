import { Schema, model, models } from "mongoose";

const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: String,
  organizer: String,
  logoUrl: String,
  rules: String,
  prizeMoney: Number,
  participatingTeams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  tournamentType: {
    type: String,
    enum: ["league", "knockout", "combination"],
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming",
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

TournamentSchema.index({ startDate: 1 });
TournamentSchema.index({ status: 1 });

export default models.Tournament || model("Tournament", TournamentSchema);
