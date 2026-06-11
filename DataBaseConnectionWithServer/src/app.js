const express = require("express");
const noteModel = require("./models/note.model");
const app = express();

/*
POSt/notes = Create a note
GET/notes = Get All notes
DELETE/notes/:id = Delete a note
PATCH/notes:id = Update a note

*/ 

// middleware 
app.use(express.json());

app.post("/notes" , async(req, res) =>{
  const data = req.body;
  console.log(data);
  
  await noteModel.create({
    title : data.title,
    description : data.description
  })
  res.status(201).json({
    message : 'Note created successfully'
  })
})

// get method 

/*

find return = [{} , {}]
findeone = {} or null

*/

app.get("/notes", async (req, res) => {
  // findOne()  find only one return object 
  const notes = await noteModel.find();

  res.status(200).json({
    message: "note fetch successfully",
    notes: notes
  });
});

// delete 

app.delete("/notes/:id" ,async (req, res)=>{
  const id = req.params.id
  await noteModel.findByIdAndDelete({
    _id : id
  })
  res.status(200).json({
    message : "note delete successfully"
  })
})

// patch 

app.patch("/notes/:id" , async (req, res )=>{
  const id = req. params.id
  const description = req.body.description;

  await noteModel.findByIdAndUpdate(
    {_id:id},
    {description:description}
  )
  res.status(200).json({
    message : 'note update successfylly'
  })
})
module.exports = app;