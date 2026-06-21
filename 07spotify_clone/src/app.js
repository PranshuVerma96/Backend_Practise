const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/auth.route');
const musiceRoute = require("./routes/music.route");

const app = express();
// middleware 
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use("/api/mugic" , musiceRoute);
module.exports = app;