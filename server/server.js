const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const auth = require('./Routes/authentication');
const user = require('./Routes/user');

mongoose.connect('mongodb+srv://login:login@cluster0.an2mhxl.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('db is connected')
);

app.use(express.json());
app.use(cors({
    origin: '*'
}));

//auth api's
app.use('/api/auth', auth);
//user api's
app.use('/api/user', user);

app.listen(5000, () => console.log('server is running'));