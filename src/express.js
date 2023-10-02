const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
const secretKey = '12345678';

app.use(bodyParser.json());

app.post('/api/token', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@findly.co' && password === 'password') {
    const token = jwt.sign({ email, role: 'admin' }, secretKey);

    res.json({ token, redirect: '/dashboard', role: 'admin' });
  } else if (email === 'user@findly.co' && password === 'password') {
    const token = jwt.sign({ email, role: 'user' }, secretKey);

    res.json({ token, role: 'user' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
