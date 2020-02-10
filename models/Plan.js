const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description:{
      type:String,

  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
     
    }
  ]
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;