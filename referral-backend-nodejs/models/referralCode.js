const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    referralCode: { type: String, required: true },
    user: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

// Create the User model
const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
