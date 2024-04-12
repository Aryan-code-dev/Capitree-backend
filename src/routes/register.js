const express = require('express');
const User = require('../models/users');
const Node = require('../models/nodes');
const Edge = require('../models/edges');
const router = express.Router();
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
    try {

        if (!req.body.name || !req.body.password || !req.body.email) {
            return res.status(400).json({
                message: "Please enter all required fields.",
                success: false,
            });
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const saltRounds = 10;

        const { name, password, email } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username: name,
            password: hash,
            email: email,
        })
        var suc = await newUser.save();
        console.log(suc);
        if(suc){
            await Node.create({nodeId: "0", owner: email,type: "default",returnType: "",label: "USER", height: 100, width: 50, x: 50, y: 50})
        }
        return res.status(200).json({ message: 'User registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }



})
module.exports = router;