const express = require("express")
const router = express.Router();
const User = require("../model");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, isAdmin = false } = req.body;

        const exuser = await User.findOne({ email });
        if (exuser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const newUser = new User({ name, email, password, isAdmin });
        await newUser.save();
        return res.json({ msg: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
        console.log(err);
    }
});

app.post("/login", async (req, res) => {

    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "Invalid email" });
        }
        if (user.password !== password) {
            return res.status(404).json({ msg: "Invalid password" });
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;