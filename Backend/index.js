//создаем экспресс приложение
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const path = require('path');
const connectionDB = require('./connections/db');
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,// Позволяем обмениваться куками
  origin: process.env.CLIENT_URL// Указываем адрес нашего клиента
}));
app.use('/api', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'));
});
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start();

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'));
// });