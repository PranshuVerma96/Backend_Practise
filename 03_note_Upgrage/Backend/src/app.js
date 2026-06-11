const express = require("express");

const app = express();
// middleware

app.use(express.json());

const notes = [];
/*
title , discription  methods  */

// post method
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Successfully created ",
  });
});

// get method all notes appear

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
    message: "note fetch Successfully",
  });
});

// Delete /notes/:index

app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];

  console.log(req.params.index);

  res.status(200).json({
    message: "notes Successfully deleted",
  });
});

// patch /notes:index
app.patch("/notes/:index" , (req ,res) =>{
  const index = req.params.index;
  
  const description = req.body.description;
  console.log(req.body.description);

  const title = req.body.title
  notes[index].description = description;
  notes[index].title = title

  res.status(200).json({
    message : "notes updates Successfully"
  })
})

module.exports = app;
