// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  fs.readFile('tasks.json', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

app.post('/tasks', (req, res) => {
  fs.writeFile('tasks.json', JSON.stringify(req.body), err => {
    if (err) return res.status(500).send('Error saving tasks');
    res.send('Tasks saved');
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
