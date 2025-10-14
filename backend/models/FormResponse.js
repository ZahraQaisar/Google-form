import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: true,
    },
    responses: {
      type: Object, // stores dynamic form answers (key-value)
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional — only if user is logged in
    },
  },
  { timestamps: true }
);

export default mongoose.model("FormResponse", formResponseSchema);
