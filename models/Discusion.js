import mongoose from "mongoose";

const DiscusionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    replies: [
        {
          whoreply: {
                type: String,
                required: true
            },
            replayText: {
                type: String,
                required:true
            }
        }
    ],
  },
  { timestamps: true }
);

export const Discusion = mongoose.models?.Discusion || mongoose.model("Discusion", DiscusionSchema);