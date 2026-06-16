const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");
const cors = require('cors');

const app = express();
// middleware

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.use(express.json());

// route to create post
app.post("/create-post", upload.single("image"), async (req, res) => {
  

  const result = await uploadFile(req.file.buffer);
  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption
  });
  return res.status(201).json({
    message: "Successfully uploadfile ",
    post
  });
});

app.get("/posts" , async (req ,res)=>{
  const posts = await postModel.find()

  return res.status(200).json({
    message : "post fetched Successfully",
    posts
  })
})

module.exports = app;
