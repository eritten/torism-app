const express = require('express');
const bcrypt = require('bcryptjs');
const lodash = require("lodash");

const encodeJsonWebToken = require('../../core/encodeJsonWebToken');
const hashPassword = require('../../core/password_hash');
const User = require('../../models/user.model');
const userInputValidate = require('../../validators/user_validation');
const sendMailWithVerificationCode = require("../../core/send_verification-code");
const generateRandomCode = require("../../core/verification-code-generator");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const validation = userInputValidate.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message });
        }

        const existingUser = await User.findOne({ where: { email: userEmail } });
        if (existingUser) {
            return res.status(400).json({ error: "A user associated with this email already exists" });
        }

        const hashedPassword = await hashPassword(req.body.password);
        const user = await User.create({ email: userEmail, password: hashedPassword, userType: req.body.userType });

        const code = await generateRandomCode(2);
        await sendMailWithVerificationCode(code, user.email);
        const data = lodash.pick(user, ['email'])
        return res.status(201).json(data);
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;