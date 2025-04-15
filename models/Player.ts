import { model, models, Schema } from "mongoose";

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
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

PlayerSchema.index({ name: 1 });

export default models.Player || model("Player", PlayerSchema);
