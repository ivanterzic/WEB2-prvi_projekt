const express = require('express');
const path = require('path');
const app = express();
import dotenv from 'dotenv';
import {auth, requiresAuth} from 'express-openid-connect';
import https from 'https'; 

app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');  
 
app.use((req, res) => { 
    res.render('index');
}); 

// Start the server
const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});