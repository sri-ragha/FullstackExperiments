const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Ensure data.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const { name, email, phone, address, age, gender, comments } = req.body;
  if (!name || !email || !phone || !address || !age || !gender) {
    return res.status(400).send('All fields except comments are required.');
  }
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    data = [];
  }
  data.push({ name, email, phone, address, age, gender, comments });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  res.redirect('/data');
});

app.get('/data', (req, res) => {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    data = [];
  }
  res.render('data', { submissions: data });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 