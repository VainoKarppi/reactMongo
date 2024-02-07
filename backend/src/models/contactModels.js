
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  twitter: String,
  avatarUrl: String,
  notes: String
});

module.exports = mongoose.model('User', userSchema);