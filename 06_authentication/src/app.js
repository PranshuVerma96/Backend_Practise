const express = require('express');
const authRoutes = require("./routes/auth.routes");
const cookieParser = require('cookie-parser');
const postRouter = require("./routes/post.routes");
// middleware 

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/" , authRoutes);
app.use("/api/posts" ,postRouter);


module.exports = app;
