const express = require('express');
const path = require('path');
const app = express();
import dotenv from 'dotenv';
import {auth, requiresAuth} from 'express-openid-connect';
import https from 'https';

app.use(express.static(path.join(__dirname, '../react-app/build')));

app.use((req, res) => {
    res.status(200).send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});