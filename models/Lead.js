import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// LEAD MODEL SCHEMA stores leads captured from the landing page.
// Implement this when your product is in development and you need to gather email addresses
// Email collection is handled by the <ButtonLead /> component and the /api/lead endpoint
const leadSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Apply plugin for mongoose to JSON conversion
leadSchema.plugin(toJSON);

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
