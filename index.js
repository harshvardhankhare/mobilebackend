const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
require("./DB/connectDB");

const app = express();
const port = 7000;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const User = require("./models/user");
const Service = require("./models/service");
const Booking = require("./models/booking");

// Register route
app.get('/', async (req,res)=>{

     res.json({ msg: " server  successfully" });
})
app.post("/register", async (req, res) => {
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
app.post("/create-service", async (req, res) => {
    try {
        const { name, description, urlimg, category,price} = req.body;

        
       
        const newService = new Service({ name, description, urlimg, category,price });
        await newService.save();
        return res.json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
        console.log(err);
    }
});

// Login route
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

// Get profile route
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error while getting the profile" });
    }
});

// Update profile route
app.put("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { phone, address, gender,imageurl } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user fields
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (gender) user.gender = gender;
        console.log(imageurl)
        if (imageurl) user.imageurl = imageurl;

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while updating the profile" });
    }
});

app.post('/bookings', async (req, res) => {
    const { service, name, phone, address } = req.body;
    const newBooking = new Booking({
      service,
      name,
      phone,
      address,
      status: 'active',
      createdAt: new Date(),
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created', booking: newBooking });
  });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
