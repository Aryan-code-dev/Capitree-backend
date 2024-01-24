const express = require('express');
const User = require('../models/users');
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields.",
                success: false,
            });
        }

        // First Check- If User exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User name not found. Invalid login credentials.",
                success: false,
            });
        }
        if (await user.validatePassword(password)) {
            // if the password matches -> Sign a the token and issue it to the user

            let token = await user.generateAuthToken(); // not sure if error handling is necessary here
            let result = {
                token: `Bearer ${token}`,
                message: "You are now logged in."
            };
            return res.status(200).json({result});
        }
        else {
            return res.status(401).json({message: "Incorrect password."});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }




})
module.exports = router;