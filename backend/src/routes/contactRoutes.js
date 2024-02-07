// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/contactModels');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST new user
router.post('/', async (req, res) => {
  const user = new User({
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