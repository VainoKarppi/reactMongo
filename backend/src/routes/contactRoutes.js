// routes/users.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');


function isEmptyArray(data) {
    return Array.isArray(data) && data.length === 0;
}

// GET all users
router.get('/', async (req, res) => {
    
    try {
        console.log("Request for all users...");
        const users = await Contact.find();
        console.log(`data: ${users}`);
        res.json(users);

    } catch (err) {
        console.log("1111");
        res.status(500).json({ message: err.message });
    }
});

// GET single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// PUT old user
router.put('/createContact', async (req, res) => {

    const { id } = req.body;
    console.log("UPDATING CONTACT!");
    console.log(id);

});


// DLETE contact
router.delete('/removeContact/:id', async (req, res) => {

    const { id } = req.params;
    console.log("REMOVED CONTACT!");
    

    user = await Contact.findById(id);
    console.log(user);

    try {
        //await user.delete();
        res.status(201);
        console.log("SUCCESS");
    } catch (err) {
        console.log("ERROR");
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// POST new user
router.post('/createContact', async (req, res) => {
    console.log("creating contact on server!!!");

    
    let newId = Math.random().toString(36).substring(2, 9);

    const user = new Contact({
        id: newId,
        createdAt: req.body.createdAt,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        twitter: req.body.twitter,
        avatarUrl: req.body.avatarUrl,
        notes: req.body.notes
    });
    try {

        console.log(user);
        const newUser = await user.save();
        res.status(201).json(newUser);
        console.log("SUCCESS");
    } catch (err) {
        console.log("ERROR");
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// ... other routes for update, delete, etc.

async function getUser(req, res, next) {
  let user;
  try {
    user = await Contact.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;