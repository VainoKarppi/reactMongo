// routes/users.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModels');


function isEmptyArray(data) {
    return Array.isArray(data) && data.length === 0;
}

// GET all users
router.get('/allUsers', async (req, res) => {
    try {
        console.log("Request for all users...");
        const users = await Contact.find();
        console.log(users);
        res.status(201).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// GET single user
router.get('/contact/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let user = await Contact.find({ id });
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// PUT old user
router.put('/createContact', async (req, res) => {

    const { id } = req.body;
    console.log("UPDATING CONTACT!");
    console.log(id);

});


// DLETE contact
router.delete('/removeContact/:id', async (req, res) => {
  try {
    let id = req.params.id;

    console.log("Removing contact...");
    console.log(id);

    const deletedContact = await Contact.findOneAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(201).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// POST new user
router.post('/contacts', async (req, res) => {
    console.log("creating contact on server!!!");
    
    // generate user id
    if (req.body.id === undefined || req.body.id === null) {
        req.body.id = Math.random().toString(36).substring(2, 9);
    }


    // generate time created if not defined
    if (req.body.createdAt === undefined || req.body.createdAt === null) {
        req.body.createdAt = Date.now();
    }

    try {
        console.log(req.body);
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
        console.log("SUCCESS");
    } catch (err) {
        console.log("ERROR");
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});





// Update a contact
router.patch('/contacts/:id', async (req, res) => {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (err) {
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