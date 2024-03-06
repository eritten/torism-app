const express = require('express');
const encodeJsonWebToken = require('../core/encodeJsonWebToken');
const hashPassword = require('../core/password_hash');
const { User } = require('../models/app.model');
const userInputValidate = require('../validators/user_validation');

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

        const hashedPassword = hashPassword(req.body.password);
        await User.create({ email: userEmail, password: hashedPassword });

        const token = encodeJsonWebToken({ email: userEmail });
        return res.json({ token });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
