const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIE_SECRET;
const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('api root route.'));

module.exports = app;
