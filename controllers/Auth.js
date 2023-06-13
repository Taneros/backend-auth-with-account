const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const secretKey = 'your-secret-key'; // change to secret key

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // check user data in database

  // check a simple password
  if (username === 'admin' && password === 'admin') {
    // If the credentials are correct, create a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/protected', authenticateToken, (req, res) => {
  // Secure route requiring authentication
  res.json({ message: 'You are successfully authenticated and have access to secure data' });
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Requires an authentication token' });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid auth token' });
      return;
    }

    req.user = user;
    next();
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
