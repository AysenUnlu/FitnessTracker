var Exercise = require('../models/Exercise');
var Plan = require('../models/Plan');
exports.index = function(req, res) {
    
     let newExercise=new Exercise();
     newExercise.name=req.body.name;
     newExercise.muscleGroup=req.body.muscleGroup;
     newExercise.sets=req.body.sets;
     newExercise.weight=req.body.weight;
     newExercise.reps=req.body.reps;
     newExercise.TotalRepetition=req.body.TotalRepetition;
     newExercise.TotalWeight=req.body.TotalWeight;
     console.log(req.body.id);
     newExercise.save()
     .then (({_id})=>Plan.findOneAndUpdate({_id:req.body.id},{ $push: { exercises:_id } }, { new: true }
          
     ).populate("exercises").then(dbPlan=>res.json(dbPlan)));
     //Plan.findOneAndUpdate({_id:planId},{ $push: { exercises:_id } }, { new: true },(err,rslt)=>{
         // if(err){console.log(err);}
         //  console.log("Hello"+rslt);
         //  res.json(rslt);
     //}));
     //.populate("exercises"))
     //.then(dbPlan=>res.json(dbPlan));    
  
    //console.log(req.user.id);
     
     /*.then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { plans: _id } }, { new: true }))
     .then(dbUser => {
         dbUser.populate("plans");
       res.json(dbUser);
     })
     .catch(err => {
       res.json(err);
     });*/
         
};

exports.setExerciseStatus=function(req,res){
    id=req.params.id;
    Exercise.update({_id:id},{$set:req.body},(err,result)=>{
        console.log(result);
        res.json(result);
    })
}