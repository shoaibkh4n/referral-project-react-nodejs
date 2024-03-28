// config/routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../app/Controller/UserController");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHead = req.headers["authorization"];

  if (!authHead) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHead.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post(
  "/create_referral",
  authenticateToken,
  UserController.createReferralCode
);
router.post("/contact", UserController.contactCompany);
router.get("/get_referrals", authenticateToken, UserController.getAllReferral);
router.delete(
  "/delete_referral",
  authenticateToken,
  UserController.deleteReferral
);

module.exports = router;
