const express = require('express');
const bcrypt = require('bcryptjs');
const hashPassword = require('../../core/password_hash');
const User = require('../../models/user.model');
const sendMailWithVerificationCode = require("../../core/send_verification-code");
const generateRandomCode = require("../../core/verification-code-generator");

const router = express.Router();

router.post("/generate-reset-code", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {

            return res.status(401).json({ "message": "Invalid email address" });
        }

        const code = randomCode(2);
        user.verificationCode = code;
        await user.save();

        await sendMailMailWithVerificationCode(code, email);


        res.status(200).json({ "message": "Code sent" });
    }
    catch (e) {
        console.log("error message" + e);
        res.status(500).json({ "message": "Internal service error" });
    }
});


module.exports = router;