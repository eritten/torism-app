const express = require("express");
const User = require("../../models/user.model");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/change-email", authMiddleware, async (req, res, next) => {
    const newEmail = req.body.newEmail;

    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(401).json({ "message": "Invalid user token" });
        }

        if (user.email == newEmail) {
            return res.status(401).json({ "message": "Your new email cannot be the same as your old email" });
        }

        user.email = newEmail;
        user.save();
        res.json({ "message": "Email changed" });
    }
    catch (e) {
        res.status(500).json({ "message": "Internal service error" });
    }
});

module.exports = router;