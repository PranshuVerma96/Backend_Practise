const express = require('express');
const authRouter = require('./routes/auth.routes')

/**
 * -Routes required 
 */
const accountRouter = require('./routes/account.routes');
const cookieParser = require('cookie-parser');

const app = express();
// middleware
app.use(express.json());
app.use(cookieParser());

// routes 
/**
 * Use routes
 */
app.use('/api/auth' ,authRouter);
app.use('/api/accounts', accountRouter);

module.exports = app;
