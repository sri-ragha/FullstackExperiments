// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  department: String
});

module.exports = mongoose.model('Student', studentSchema);
