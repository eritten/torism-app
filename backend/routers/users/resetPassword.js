const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const hashPassword = require("../../core/password_hash");

const router = express.Router();

router.post("/reset", async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ "message": "Invalid email address" });
    }

    let comparePassword = await bcrypt.compare(newPassword, user.password);
    if (comparePassword) {
        res.status(400).json({ message: "You cannot use your old password" });
        return
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ "message": "Password changed" });


});


module.exports = router;