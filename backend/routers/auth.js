const express = require('express');
const encodeJsonWebToken = require('../core/encodeJsonWebToken');
const hashPassword = require('../core/password_hash');
const { User } = require('../models/user.model');
const userInputValidate = require('../validators/user_validation');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.post("/login", async (req, res) => {
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
