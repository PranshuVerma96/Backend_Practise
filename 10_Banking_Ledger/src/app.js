const express = require('express');
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser');

const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());

// routes 
app.use('/api/auth' ,authRouter);

module.exports = app;