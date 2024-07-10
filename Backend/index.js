//создаем экспресс приложение
import express from 'express';
import bcrypt from 'bcrypt';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import userModel from './models/user.js';
import sqlite3 from 'sqlite3';
import authRoutes from './routes/auth.js';
import bodyParser from 'body-parser';

//const sqlite3 = require('sqlite3').verbose();

// const sqlite3 = require('sqlite3');

// Подключение к базе данных SQLite, создание таблицы
const db = new sqlite3.Database('./db/database.db', err => {
    if (err) {
      console.error('Database connection error:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`, err => {
        if (err) {
          console.error('Error creating users table:', err.message);
        } else {
          console.log('Table "users" created or already exists.');
        }
      });
    }
  });

const app = express();

// Использование body-parser middleware для обработки JSON-данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());//позволяет читать json, которые будут приходить по запросам

//req - что прислал клиент, res - что я отправляю
app.get('/', (req, res) => {
    res.send('Hello world')
});

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);//алгоритм шифрования пароля
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel ({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash, //зашифрованный пароль
    });

    const user = await doc.save()

    res.json({

    })
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Vitaliy',
    }, 'secret123',
)    
    
    res.json({
        success: true,
        token,
    });
});

app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server OK');
});

app.use('/api/auth', authRoutes);