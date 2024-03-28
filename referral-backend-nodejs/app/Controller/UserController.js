const User = require("../../models/signup");
const Referral = require("../../models/referralCode");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const generateRandom = require("../helper/generateRandom");
const { COMPANY_NAME } = process.env;
const { COMPANY_RECIVING_MAIL } = process.env;
const {
  ContactBodyForCompany,
  ReferralCodeUsed,
  ReferralCreated,
} = require("../templates/emailTemplate");

const { sendEmail } = require("../services/emailService");

async function referalGen(email) {
  const referal = generateRandom(email?.split("@")[0]);
  const existingReferal = await Referral.findOne({ referal });
  if (existingReferal) {
    referalGen(email);
  }
  return referal;
}

const UserController = {
  signup: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      // Get user input from request body
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  createReferralCode: async (req, res) => {
    try {
      const { name, email } = req.body;
      const existingUser = await Referral.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "👆 This Email already linked with above's referral code",
          code: `${existingUser.referralCode}`,
        });
      }
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(400).json({
          message: "User not found for the given email",
        });
      }

      const referralCode = await referalGen(email);

      try {
        const emailForGeneratedReferral = {
          to: email,
          subject: `${COMPANY_NAME} - Referral Code`,
          text: ReferralCreated(name, referralCode),
        };

        await sendEmail(emailForGeneratedReferral);

        const referral = new Referral({
          name,
          email,
          referralCode,
          user: user.email,
        });

        await referral.save();

        return res.status(200).json({
          code: `${referralCode}`,
          message: `Referral code generated for ${email} and a mail also sent to this email.`,
        });
      } catch (error) {
        console.error("Error sending email:", error);

        return res.status(500).json({
          message: `Something went wrong ,Please Check provided email and try again!!`,
        });
      }
    } catch (error) {
      console.error("Error in createReferralCode:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  },
  contactCompany: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, number, code, message } = req.body;

      const referralReference = await Referral.findOne({ referralCode: code });

      const emailToCompany = {
        to: COMPANY_RECIVING_MAIL,
        subject: `New Query on ${COMPANY_NAME}`,
        text: ContactBodyForCompany(name, email, number, message, code),
      };

      if (referralReference) {
        const emailToReferral = {
          to: referralReference?.email,
          subject: `New Query On ${COMPANY_NAME}`,
          text: ReferralCodeUsed(name, email, code),
        };
        await sendEmail(emailToReferral);
      }
      try {
        await sendEmail(emailToCompany);

        return res.status(200).json({
          message: `Succesfully submitted!!`,
        });
      } catch (error) {
        console.error("Error sending email:", error);

        return res.status(500).json({
          message: `Something went wrong , try again later!!`,
        });
      }
    } catch (error) {
      console.error("Error in contactCompany:", error);

      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getAllReferral: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(400).json({
          message: "User not found for the given email",
        });
      }

      const getReferrals = await Referral.find({ user: user.email });

      return res.status(200).json({
        referrals: getReferrals,
      });
    } catch (error) {
      console.error("Error in getAllReferrals:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteReferral: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
      const deletedReferral = await Referral.findOneAndDelete({ email });
      if (deletedReferral) {
        res.status(200).json({ message: "Referral deleted successfully" });
      } else {
        res.status(400).json({ message: "Referral not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server error" });
    }
  },
};

module.exports = UserController;
