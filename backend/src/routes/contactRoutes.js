// routes/users.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');


function isEmptyArray(data) {
    return Array.isArray(data) && data.length === 0;
}

// GET all users
router.get('/', async (req, res) => {
    console.log("aaaaa");
    try {
        const users = await Contact.find();
        
        console.log(users);
        console.log(typeof users);

        if (isEmptyArray(users)) {
            console.log("4444");
            res.json(users);
        } else {
            
            console.log("2222");
            res.json(users);
        }

    } catch (err) {
        console.log("1111");
        res.status(500).json({ message: err.message });
    }
});

// GET single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST new user
router.post('/', async (req, res) => {
    console.log("asadsasd");
    const user = new User({
        id: req.body.id,
        createdAt: req.body.createdAt,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        twitter: req.body.twitter,
        avatarUrl: req.body.avatarUrl,
        notes: req.body.notes
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ... other routes for update, delete, etc.

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;