var Plan = require('../models/Plan');
var User = require('../models/User');

var mongojs=require("mongojs");

exports.index = function(req, res) {

    
    
     let newPlan=new Plan();
     newPlan.name=req.body.name;
     newPlan.description=req.body.description;

    /* newPlan.save()
     .then((result)=>{
             res.json(result)});*/

             newPlan.save().then(({_id})=>User.findOneAndUpdate({_id:req.user.id},{ $push: {plans:_id } }, { new: true }
          
             ).populate("plans")
             .then((result)=>{
                     //console.log(result); 
                     res.json(newPlan.name)}));
  
         
};

exports.getPlans=function(req,res){

   /* Plan.find({},function(err,plans) {
       res.json(plans)}
    ); */
    User.findOne({_id:req.user.id}).populate("plans").then((rslt)=>{console.log(rslt.plans);res.json(rslt.plans)});  

}

exports.getPlansByID=function(req,res){
    const id=req.params.id;
    console.log(id);
    Plan.findById(id).populate("exercises").then(function(plans){   
        res.json(plans);
    });

}




