const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
