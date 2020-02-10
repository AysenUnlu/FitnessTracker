

const tableBodyEl=$("#tableBody");
const tableEl=$("#table");
$("#table").on("click","[type='checkbox']",statusExercise);
$("#addEx").on("click", addExercise);
$("#addP").on("click", getPlanInfo);
$("#PlanForm").on("submit", planInfo);
$("#ExerciseForm").on("submit", ExerciseInfo);
$(".dropdown").on("click",selectWorkout);
$(window).on("load",initialize);
let currentId;

function statusExercise(event){
    const id=event.target.id;
    let checked=false;
    if($("#"+id).is(":checked")){
        checked={completed:true};
    }
    else{
        checked={completed:false};
    }
    $.ajax({
        type: "PUT",
        url: "/exercise/"+id,
        dataType: "json",
        data: checked,
        // On successful call
        success: function(data) {
            console.log(data);
        }    
    });
} 

function addExercise(event){
    $("#exerciseModal").modal("show");
}
function selectWorkout(event){
    const id=event.target.id;
   
    if ((id!=="addP")&&(id!=undefined)&&(id!=="")){
        currentId=id;
        $.get("/plans/"+id).then(function(result) {   
            //console.log(result);
            $("#pname").text(result.name);
            $("#pdescription").text(result.description);
            showExercise(result);
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });

    }
}
function initialize(){
    $.get("/plans").then(function(result) {   
          //console.log(result);
          for(let i=0;i<result.length;i++){
            $(".dropdown-menu").prepend($("<li><button class='btn' id="+result[i]._id+">"+result[i].name+"</button></li>")); 
          }
         if(result.length>0){ 
          $("#pname").text(result[result.length-1].name);
          $("#pdescription").text(result[result.length-1].description);
          currentId=result[result.length-1]._id;
          //console.log("HELLO:"+JSON.stringify(result[result.length-1]));
           ////////////////////////////////////////////////////////////////
           $.get("/plans/"+currentId).then(function(result) {  
               showExercise(result); 
           });   
           ////////////////////////////////////////////////////////////////

         } 
        
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
}
function getPlanInfo(){
    $("#modalPlanInput").modal("show");

}
let planName;
let planDesc;
function planInfo(event){
     event.preventDefault();
     planName=$("#PlanName").val().trim();
     planDesc=$("#PlanDesc").val().trim();
     const plan={
        name:planName,
        description:planDesc
    }
     if (!plan.name || !plan.description) {
        return;
      }
  
     
     savePlan(plan.name, plan.description);
     $("#PlanName").val("");
     $("#PlanDesc").val("");
}
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function savePlan(name,description) {
      $.post("/plans", {
        name: name,
        description: description
      }).then(function(result) {   
          console.log(result);
        $(".dropdown-menu").prepend($("<li><button class='btn' id="+result._id+">"+result+"</button></li>"));  
         window.location.replace("/workout");
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
}

function ExerciseInfo(event){
    event.preventDefault();
    exerciseName=$("#ExerciseName").val().trim();
    muscleGroup=$("#muscle").val().trim();
    sets=$("#sets").val().trim();
    weight=$("#weight").val().trim();
    reps=$("#reps").val().trim();
    const exercise={
       name:exerciseName,
       muscleGroup:muscleGroup,
       sets:sets,
       weight:weight,
       reps:reps,
       TotalRepetition:parseInt(sets)*parseInt(reps),
       TotalWeight:parseInt(sets)*parseInt(reps)*parseInt(weight)

   }
    if (!exercise.name || !exercise.sets||!exercise.weight||!exercise.reps) {
       return;
     }
    //console.log(exercise);
    saveExercise(exercise);
    $("#ExerciseName").val("");
    $("#sets").val("");
    $("#weight").val("");
    $("#reps").val("");
}
    
function saveExercise(exercise){
    console.log("saving");
    exercise.id=currentId;
    $.post("/exercise/", exercise).then(function(result) {   
          console.log("Heelo:"+JSON.stringify(result));
          showExercise(result,currentId);
        //window.location.replace("/");
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });

}

function showExercise(result){
    tableBodyEl.empty();
    let counter=1;
    
    for(let i=0;i<result.exercises.length;i++){
        const row=$("<tr>")
       row.append($("<th scope='row'>"+counter+"</th>")); //th
       row.append($("<td>"+result.exercises[i].name+"</td>"));//td
       row.append($("<td>"+result.exercises[i].muscleGroup+"</td>"));//td
       row.append($("<td>"+result.exercises[i].sets+"</td>"));//td
       row.append($("<td>"+result.exercises[i].weight+"</td>"));//td
       row.append($("<td>"+result.exercises[i].reps+"</td>"));//td
       row.append($("<td>"+result.exercises[i].TotalRepetition+"</td>"));//td
       row.append($("<td>"+result.exercises[i].TotalWeight+"</td>"));//td
        const ctd=$("<td>");
        let chck="";
        let cElement;
        if(result.exercises[i].completed){
            chck=$("<input type='checkbox' id='"+result.exercises[i]._id+"' checked>");
        }
        else{
            chck=$("<input type='checkbox' id="+result.exercises[i]._id+">");
        }
        cElement=ctd.append(chck);//check
        row.append(cElement);
        tableBodyEl.append(row);
        counter++
    }
    
}
