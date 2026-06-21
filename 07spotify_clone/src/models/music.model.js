const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  uri : {
    type : Sring,
    required : true
  },
  title:{
    type:String,
    required 
  },
  artist : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required :true,
  }
})

const musicModel = mongoose.model("music" , musicSchema);

module.export = musicModel