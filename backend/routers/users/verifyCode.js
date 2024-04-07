const express = require('express');
const User = require("../../models/user.model");

const router = express.Router();

router.post("/verify-code", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // If user is null, it means no user found with the provided email
            res.status(404).json({ message: "User not found" });
            return;
        }

        console.log("code value " + user.code + " " + req.body.code);

        if (user.verificationCode !== req.body.code) {
            res.status(401).json({ message: "Invalid code" });
            return;
        }

        user.isVerified = true;
        user.verificationCode = "";
        await user.save();

        res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        console.error("Error verifying code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;