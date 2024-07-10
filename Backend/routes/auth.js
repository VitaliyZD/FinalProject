import express from 'express';
const router = express.Router();
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/database.db', err => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Роут для регистрации пользователя
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'User registered successfully', userId: this.lastID });
    });
});

// Роут для входа пользователя
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', user: row });
  });
});

export default router;