const express = require('express');
const encodeJsonWebToken = require('../core/encodeJsonWebToken');
const hashPassword = require('../core/password_hash');
const { User } = require('../models/user.model');
const userInputValidate = require('../validators/user_validation');
const bcrypt = require('bcryptjs');

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
        console.log(hashedPassword);
        await User.create({ email: userEmail, password: hashedPassword, userType: req.body.userType });

        const token = encodeJsonWebToken({ email: userEmail });
        return res.status(201).json({ token });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;