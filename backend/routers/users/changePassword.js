const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const hashedPassword = require("../../core/encodeJsonWebToken");
const hashPassword = require("../../core/password_hash");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/change-password", authMiddleware, async (req, res) => {
    const userEmail = req.user.email;
    const newPassword = req.body.password;
    // Retrieving the user from the database.
    const user = await User.findOne({ email: userEmail });
    const comparePasswords = await bcrypt.compare(newPassword, user.password);

    if (comparePasswords) {
        return res.status(401).json({ "message": "Your new password cannot be the same as your old password" });
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.json({ "message": "Password changed successfully" });

});

module.exports = router;