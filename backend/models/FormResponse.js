// backend/models/FormResponse.js
import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true },
    responses: { type: Object, required: true },
    user: { type: String, default: null },
  },
  { timestamps: true }
);

const FormResponse = mongoose.model("FormResponse", formResponseSchema);
export default FormResponse;
