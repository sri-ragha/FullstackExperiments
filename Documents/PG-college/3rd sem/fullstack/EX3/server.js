// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Import the student model
const Student = require('./models/Student');

// Initialize the express app
const app = express();

// Connect to MongoDB
mongoose.connect('url')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Create student
app.post('/students', async (req, res) => {
  const { name, age, email } = req.body;
  const student = new Student({ name, age, email });
  await student.save();
  res.redirect('/students');
});

// View students in formatted table
app.get('/students', async (req, res) => {
  const students = await Student.find();

  let html = `
    <html>
    <head>
      <title>Student List</title>
      <style>
        body { font-family: Arial; margin: 40px; }
        table { width: 80%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background-color: #f4f4f4; }
        a.button { padding: 6px 12px; margin: 0 5px; background: #007BFF; color: white; text-decoration: none; border-radius: 4px; }
        a.button:hover { background: #0056b3; }
      </style>
    </head>
    <body>
      <h1>Student Details</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
  `;

  students.forEach(student => {
    html += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>
          <a class="button" href="/edit/${student._id}">Edit</a>
          <a class="button" href="/delete/${student._id}" style="background: #dc3545;">Delete</a>
        </td>
      </tr>
    `;
  });

  html += `
      </table>
      <a href="/" class="button" style="background: #28a745;">Add New Student</a>
    </body>
    </html>
  `;

  res.send(html);
});

// Edit student form
app.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(`
    <h2>Edit Student</h2>
    <form action="/update/${student._id}" method="POST">
      <input type="text" name="name" value="${student.name}" required>
      <input type="number" name="age" value="${student.age}" required>
      <input type="email" name="email" value="${student.email}" required>
      <button type="submit">Update</button>
    </form>
    <br><a href="/students">Cancel</a>
  `);
});

// Update student
app.post('/update/:id', async (req, res) => {
  const { name, age, email } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, age, email });
  res.redirect('/students');
});

// Delete student
app.get('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
