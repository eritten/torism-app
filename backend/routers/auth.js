const express = require('express');
const encodeJsonWebToken = require('../core/encodeJsonWebToken');
const hashPassword = require('../core/password_hash');
const { User } = require('../models/app.model');
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

        const hashedPassword = hashPassword(req.body.password);
        await User.create({ email: userEmail, password: hashedPassword });

        const token = encodeJsonWebToken({ email: userEmail });
        return res.json({ token });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/authenticate", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ "message": "user does not exist" });
            return;
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(401).json({ "message": "Invalid password" });
            return;
        }
        const jwt = encodeJsonWebToken({ email: email });
        res.json({ "token": jwt });
    }
    catch (e) {
        res.status(500).json({ "message": "Internal service error" });
    }
});

module.exports = router;
