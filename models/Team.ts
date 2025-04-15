import { Schema, model, models } from "mongoose";

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  teamColor: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

TeamSchema.index({ name: 1 }, { unique: true });

export default models.Team || model("Team", TeamSchema);
