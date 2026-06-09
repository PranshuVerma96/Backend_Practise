const express = require("express");

const app = express()

const notes = []
// title and description 

// middleware 
app.use(express.json());

// methods 


app.post("/notes" , (req , res) => {
    // console.log(req.body);
    notes.push(req.body);

    res.status(201).json({
      "message" : "note createed successfully"
    })
    
} )

app.get('/notes' , (req ,res) =>{
  res.status(200).json({
    message : "notes fetch successfully",
    "notes" : notes
  })
})

// delete method /notes/:index  : pata chanlta he useke baad sab dynmic rahega 

app.delete("/notes/:index" , (req ,res) =>{
  const index = req.params.index
   delete notes[index];

   res.status(200).json({
    message : 'note deleted successfully'
   })
})  

// patch
app.patch("/notes/:index" , (req ,res) =>{
  const index = req.params.index
  const description = req.body.description
  const title = req.body.title;

  notes[index].title = title;
  notes[index].description = description;

  res.status(200).json({
    message : " note update successfully"
  })
})
module.exports = app;

// is file me server create karte he