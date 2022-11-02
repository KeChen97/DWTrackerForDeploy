const nonworkBtn1 = document.querySelector("#nonworkBtn1");
const nonworkModal1 = document.querySelector(".nonworkModal");
const nonworkModal1Close = document.querySelector("#nonworkModal1-close");
nonworkBtn1.onclick = function () {
  nonworkModal1.style.display = "block";
}
nonworkModal1Close.onclick = function () {
  nonworkModal1.style.display = "none";
}

// Add Food Modal
const foodmodal = document.querySelector(".foodModal");
const addFoodModalBtn = document.querySelector("#addFoodModalBtn");
const foodclose = document.querySelector("#wkt-close1");

// When the user clicks on the arrow button, open the addFood modal
addFoodModalBtn.onclick = function () {
  foodmodal.style.display = "block";
};

foodclose.onclick = function () {
  foodmodal.style.display = "none";
};

const addFoodBtn = document.querySelector("#addFoodBtn");
const foodContent = document.querySelector("div.addedFood");
addFoodBtn.onclick = function () {
  const food = document.createElement("div");
  food.className = "row food";
  food.innerHTML = `
  <div class="col-6">
    <label> Food Name </label>
    <input class="foodName" type="text" name="foodName"/>
   </div> 
   <div class="col-6">
    <label> Calories </label>
    <input class="calories" type="number" name="calories"/> Cal
  </div>
  `;
  foodContent.appendChild(food);
}

const addedFoodDone = document.querySelector("#addAllFoodBtn");
const progress = document.querySelector(".calRatio");
const percent = document.querySelector(".percent");
const calDeflict = document.querySelector(".calDeflict");
addedFoodDone.onclick = function () {
  const allFood = foodContent.querySelectorAll(".food");
  let calories = 0;
  for (let f of allFood) {
    const cal = f.querySelector(".calories").value;
    console.log("cal",cal);
    calories += cal;
  }
  const percentage = (calories / 2500) * 100;
  
  if(localStorage.cal){
    localStorage.cal = Number(localStorage.cal) + Number(percentage);
  } else {
    localStorage.cal = Number(percentage);
  }
  const deflict = Number(2500 - localStorage.cal);
  progress.value = Number(localStorage.cal);
  percent.innerHTML = `${localStorage.cal}%`;
  console.log("deflict", calDeflict);
  calDeflict.innerHTML = `${deflict} Cal`;
  foodContent.innerHTML = "";
  foodmodal.style.display = "none";
}




// Add Workout Modal
const wktmodal = document.querySelector(".workoutModal");
const addWorkoutBtn = document.querySelector("#addWorkoutBtn");
const wktclose = document.querySelector("#wkt-close");

// When the user clicks on the start your workout button, open the addWorkout modal
addWorkoutBtn.onclick = function () {
  wktmodal.style.display = "block";
};

// When the user clicks on <span> (x), close the addWorkout modal
wktclose.onclick = function () {
  wktmodal.style.display = "none";
};

// When the user clicks anywhere outside of the addWorkout modal, close it
window.onclick = function (event) {
  if (event.target == wktmodal) {
    wktmodal.style.display = "none";
  }
};

// Add Exercises Modal
const excmodal = document.querySelector(".exerciseModal");
const addExerciseBtn = document.querySelector("#addExerciseBtn");
const exsclose = document.querySelector("#exc-close");

// When the user clicks on the add exercise button, open the addWorkout modal
addExerciseBtn.onclick = function () {
  wktmodal.style.display = "none";
  excmodal.style.display = "block";
};

//AddExercise Modal Views Switch
const fullbodyLink = document.querySelector("#fullbody-link");
const coreLink = document.querySelector("#core-link");
const legsLink = document.querySelector("#legs-link");
const backLink = document.querySelector("#back-link");
const armsLink = document.querySelector("#arms-link");

const fullbodyList = document.querySelector(".exercises-fullbody");
const coreList = document.querySelector(".exercises-core");
const legsList = document.querySelector(".exercises-legs");
const backList = document.querySelector(".exercises-back");
const armsList = document.querySelector(".exercises-arms");

fullbodyLink.onclick = function () {
  coreList.style.display = "none";
  legsList.style.display = "none";
  backList.style.display = "none";
  armsList.style.display = "none";
  fullbodyList.style.display = "block";
};

coreLink.onclick = function () {
  coreList.style.display = "block";
  legsList.style.display = "none";
  backList.style.display = "none";
  armsList.style.display = "none";
  fullbodyList.style.display = "none";
};

legsLink.onclick = function () {
  coreList.style.display = "none";
  legsList.style.display = "block";
  backList.style.display = "none";
  armsList.style.display = "none";
  fullbodyList.style.display = "none";
};

backLink.onclick = function () {
  coreList.style.display = "none";
  legsList.style.display = "none";
  backList.style.display = "block";
  armsList.style.display = "none";
  fullbodyList.style.display = "none";
};

armsLink.onclick = function () {
  coreList.style.display = "none";
  legsList.style.display = "none";
  backList.style.display = "none";
  armsList.style.display = "block";
  fullbodyList.style.display = "none";
};


// When the user clicks on <span> (x), close the addExercise modal
exsclose.onclick = function () {
  excmodal.style.display = "none";
};

function confirmUpdatedWorkout(divId, workoutId) {
  console.log(`divId:${divId}   workoutId:${workoutId}`);
  let workoutDiv = document.getElementById(`${divId}`);
  let inputs = workoutDiv.querySelectorAll('input');
  for(let input of inputs) {
    input.readOnly = true;
  }
  let confirmBtn = workoutDiv.querySelector('.confirm');
  confirmBtn.style.display = "none";
  const addedExercisesDivs = workoutDiv.querySelectorAll(".exerciseInWorkout");
  const workout = [];
  if (addedExercisesDivs != null) {
    for (let exerciseDiv of addedExercisesDivs) {
      const exercise = {};

      const exerciseName = exerciseDiv.querySelector("output").innerHTML;
      exercise.name = exerciseName;

      const form = exerciseDiv.querySelector("form");
      const formData = new FormData(form);
      
      for(let pair of formData.entries()) {
        if(pair[0] == "setNum") {
          exercise.setNum = pair[1];
        } else if (pair[0] == "weightNum") {
          exercise.weightNum = pair[1];
        } else if (pair[0] == "repNum") {
          exercise.repNum = pair[1];
        }
      }
      workout.push(exercise);
    }
  }
  console.log(workout);
  console.log("calling AddWorkout");
  

  updateWorkoutToDB(workout, workoutId);
}
// When the user click Done on addWorkout Modal, add the workout data to user's database
const addedDone = document.querySelector("#addWorkoutBtnToDB");
addedDone.onclick = async function () {
  // console.log("doneonlick");
  // const addedExercisesDivs = document.querySelector(".addedExercises");
  // const allForms = addedExercisesDivs.querySelectorAll("form");
  const addedExercisesDivs = document.querySelectorAll(".addedExercise");
  const workout = [];

  if (addedExercisesDivs != null) {
    for (let exerciseDiv of addedExercisesDivs) {
      const exercise = {};

      const exerciseName = exerciseDiv.querySelector(
        ".addedExercise-name"
      ).querySelector("output").innerHTML;
      exercise.name = exerciseName;

      const form = exerciseDiv.querySelector("form");
      const formData = new FormData(form);
      
      for(let pair of formData.entries()) {
        if(pair[0] == "setNum") {
          exercise.setNum = pair[1];
        } else if (pair[0] == "weightNum") {
          exercise.weightNum = pair[1];
        } else if (pair[0] == "repNum") {
          exercise.repNum = pair[1];
        }
      }

      workout.push(exercise);
    }
  }
  console.log(workout);
  console.log("calling AddWorkout");

  addWorkoutToDB(workout);
  const addedExercises = document.querySelector("div.addedExercises");
  addedExercises.innerHTML = ``;
  wktmodal.style.display = "none";
};
async function updateWorkoutToDB(workout, workoutId) {
  const res = await fetch("/getuser");
  const user = await res.json();
  const data = {
        user: user.user,
        workout: workout,
        workoutId: workoutId
  };

  console.log("data", data);

  const response = fetch('http://localhost:3000/updateworkout', {
    method : 'POST',
    body : JSON.stringify(data),
    headers : {
      'Content-Type' : 'application/json',
    }
  }).then(data => {
    console.log(data);
  })
}

async function addWorkoutToDB (workout) {
  const res = await fetch("/getuser");
  const user = await res.json();
  const data = {
        user: user.user,
        workout: workout
  };

  console.log("data", data);

  // const req = new XMLHttpRequest();
  // req.open("POST", "http://localhost:3000/addworkout", true);
  // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // req.send(JSON.stringify(data));

  const response = fetch('http://localhost:3000/addworkout', {
    method : 'POST',
    body : JSON.stringify(data),
    headers : {
      'Content-Type' : 'application/json',
    }
  }).then(data => {
    console.log(data);
  })
}


async function deleteWorkout(workoutId){
  const res = await fetch("/getuser");
  const user = await res.json();
  const data = {
        user: user.user,
        workoutId: workoutId
  };
  console.log("szy data", data);
  const response = fetch('http://localhost:3000/deleteworkout', {
    method : 'POST',
    body : JSON.stringify(data),
    headers : {
      'Content-Type' : 'application/json',
    }
  }).then(data => {
    console.log(data);
  })
}

const templateModule = document.querySelector(".template-part");
const exercisesModule = document.querySelector(".exercises-part");
const historyModule = document.querySelector(".history-part");
const mainPanel = document.querySelector(".main-panel");
const exercisesLink = document.querySelector("#exercises-link");
const historyLink = document.querySelector("#history-link");
const templateLink1 = document.querySelector("#template-link1");
const templateLink2 = document.querySelector("#template-link2");
const templateLink3 = document.querySelector("#template-link3");

//Switch to Exercises Module
exercisesLink.onclick = function () {
  mainPanel.style.display = "none";
  historyModule.style.display = "none";
  templateModule.style.display = "none";
  exercisesModule.style.display = "block";
};

//Switch to history Module
historyLink.onclick = function () {
  mainPanel.style.display = "none";
  exercisesModule.style.display = "none";
  templateModule.style.display = "none";
  historyModule.style.display = "block";
};

//Switch to Overview
const overviewLink = document.querySelector("#overview-link");
overviewLink.onclick = function () {
  exercisesModule.style.display = "none";
  historyModule.style.display = "none";
  templateModule.style.display = "none";
  mainPanel.style.display = "flex";
};

//Switch to Templates
templateLink1.onclick = function () {
  mainPanel.style.display = "none";
  exercisesModule.style.display = "none";
  historyModule.style.display = "none";
  templateModule.style.display = "block";
};
templateLink2.onclick = function () {
  mainPanel.style.display = "none";
  exercisesModule.style.display = "none";
  historyModule.style.display = "none";
  templateModule.style.display = "block";
};
templateLink3.onclick = function () {
  mainPanel.style.display = "none";
  exercisesModule.style.display = "none";
  historyModule.style.display = "none";
  templateModule.style.display = "block";
};

const greeting = document.querySelector(".greeting");
//const wktReminder = document.querySelector(".wktReminder");
//render user's data
async function renderUser() {
  const res = await fetch("/getuser");
  //console.log("this is the res", res);
  const user = await res.json();
  //console.log("this is the user", user.user);

  const userName = document.querySelector(".username");
  if (user.user) {
    userName.innerHTML = `${user.user.fname}`;
  } 
  if (!user.user.exerciseHistory) {
    greeting.innerHTML = `
    <p>No workout today</p>`;
  } else {
    greeting.innerHTML = `
    <p>Good Job! You did workout today!</p>`;
  }

  if(localStorage.cal){
    progress.value = Number(localStorage.cal);
    percent.innerHTML = `${localStorage.cal}%`;
  } else {
    progress.value = 0;
    percent.innerHTML = '0%';
  }
  const deflict = Number(2500 - localStorage.cal);
  calDeflict.innerHTML = `${deflict} Cal`;
}
renderUser();
