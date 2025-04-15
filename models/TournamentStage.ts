import { model, models, Schema } from "mongoose";

const TournamentStageSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  stageNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  stageType: {
    type: String,
    enum: ["round-robin", "single-elimination", "double-elimination"],
    required: true,
  },
  startDate: Date,
  endDate: Date,
  numberOfGroups: Number, // For round-robin stages
  teamsPerGroup: Number, // For round-robin stages
  advancingTeamsPerGroup: Number, // How many teams advance to next stage
  isCompleted: {
    type: Boolean,
    default: false,
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

TournamentStageSchema.index({ tournamentId: 1 });
TournamentStageSchema.index({ tournamentId: 1, stageNumber: 1 });

export default models.TournamentStage ||
  model("TournamentStage", TournamentStageSchema);
