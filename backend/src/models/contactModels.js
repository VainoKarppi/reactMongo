
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    createdAt: Number,
    firstname: String,
    lastname: String,
    twitter: String,
    avatarUrl: String,
    notes: String
});

module.exports = mongoose.model('Contact', userSchema);