import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER MODEL SCHEMA
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    image: {
      type: String,
    },
    // Utilized within Stripe webhooks for user identification and subsequently for creating Customer Portals or auto-filling payment information
    customerId: {
      type: String,
      validate(value) {
        return value.includes("cus_");
      },
    },
    // Applied in Stripe webhooks. Must correspond to a plan defined in the config.js file.
    priceId: {
      type: String,
      validate(value) {
        return value.includes("price_");
      },
    },
    // Determines whether the user possesses product access—toggled by Stripe webhook events
    hasAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Apply plugin for mongoose to JSON conversion
userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);
