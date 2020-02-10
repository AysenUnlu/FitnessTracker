const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  muscleGroup:String,   
  sets:Number,
  weight:Number,
  reps:Number,
  TotalRepetition:{
      type:Number,
      default:0
  },
  TotalWeight:{
      type:Number,
      default:0
  },    
  completed:{
      type:Boolean,
      default:false,
  }    

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;