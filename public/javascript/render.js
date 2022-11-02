function Index() {
  const index = {};
  const exercisesDiv = document.querySelector("div.exercises");
  //console.log(exercisesDiv.innerHTML);

  async function fetchExercises() {
    console.log("FetchExercises");
    const res = await fetch("./getExercises");
    const exercieses = await res.json();
    renderExercises(exercieses);
    renderExercisesInModal(exercieses);
  }

  function renderExercises(exercises) {
    exercisesDiv.innerHTML = "";
    //console.log("render exercises", exercises);
    let i = 1;
    for (let q of exercises) {
      const qDiv = document.createElement("div");
      qDiv.className = "col-sm-4 card exerciseCard";

      qDiv.innerHTML = `        
                    <h5 class="card-title"> <output>${q.Exercise}</output></h5>
                    <div><label>Equipment: <output>${q.Equipment}</output></label></div>
                `;
      if (q.Notes) {
        qDiv.innerHTML += `        
                    <div><label>Notes: <output>${q.Notes}</output></label></div>  
                `;
      }
      i++;
      exercisesDiv.appendChild(qDiv);
    }
  }

  // Render the exercises in AddExercises Modal
  const bodyparts = ["Full Body", "Core", "Legs", "Back", "Arms"];
  const fullbodyDiv = document.querySelector("#exercises-fullbody-list");
  async function renderExercisesInModal(exercises) {
    let i = 1;
    for (let p of bodyparts) {
      const id = "bodyparts" + i;
      //console.log(id);
      const bodypartDiv = document.getElementById(id);
      //console.log("render List", bodypartDiv);
      bodypartDiv.innerHTML = "";
      for (let q of exercises) {
        const qDiv = document.createElement("div");
        qDiv.className = "col-sm-4 card addExerciseCard";
        if (q.MajorMuscle.includes(p)) {
          qDiv.innerHTML = `        
                        <h5 class="card-title"> <output>${q.Exercise}</output></h5>
                        <div><label>Equipment: <output>${q.Equipment}</output></label></div>
                        <button class="addExerciseBtn" onclick="selectExercise('${q.Exercise}')">
                            <span class="material-symbols-outlined">
                                Add
                            </span>
                        </button>
                    `;
          bodypartDiv.appendChild(qDiv);
        }
      }
      i++;
    }
  }

  const historyDiv = document.querySelector("div.history");
  async function fetchHistory () {
    console.log("FetchHistory");
    const res = await fetch("./getHistory");
    console.log("dscfvg",res);
    if(res) {
      const history = await res.json();
      renderHistory(history);
    }    
  }

  async function renderHistory(history) {
    console.log("Render History");
    historyDiv.innerHTML = "";
    for(let h of history) {
      const exerciesesArr = h.workout;
      const workoutId = h.id;
      const hDiv = document.createElement("div");
      hDiv.className = "row card workoutHistoryCard";
      hDiv.innerHTML = `
      <div class="row date">
        <label class="col-3"> Date: </label> 
        <span class="col-3"><output>${h.date.substring(0,10)}</output></span>
      </div>
      `;
      const workoutDiv = document.createElement("div");
      const divId = workoutId.substring(0,5);
      workoutDiv.className = "row workout";
      hDiv.id = `${divId}`;
      for(let exc of exerciesesArr) {
        const exerciseDiv = document.createElement("div");
        exerciseDiv.className = "row exerciseInWorkout";
        exerciseDiv.innerHTML = `
        <form>
          <label class="col-2"> Exercise Name: </label>
          <span class="col-3"><output>${exc.name}</output></span>
          <label class="col-2" for="weightNum"> Weight: </label>
          <span class="col-1"><input class="inputBox" type="number" name="weightNum" readonly value="${exc.weightNum}"></input></span>
          <label class="col-1" for="setNum"> Set: </label>
          <span class="col-1"><input class="inputBox" type="number" name="setNum" readonly value="${exc.setNum}"></input></span>
          <label class="col-1" for="repNum"> Reps: </label>
          <span class="col-1"><input class="inputBox" type="number" name="repNum" readonly value="${exc.repNum}"></input></span>
        </form>
        `;
        workoutDiv.appendChild(exerciseDiv);
      }
      hDiv.appendChild(workoutDiv);
      const deleteBtn = document.createElement("div");
      deleteBtn.innerHTML = `
      <button onclick=deleteWorkout('${workoutId}')>
        <span class="material-symbols-outlined">
          close
        </span>
      </button>`
      hDiv.appendChild(deleteBtn);

      const updateBtn = document.createElement("div");
      updateBtn.className = "update";
      updateBtn.innerHTML = `
      <button onclick=updateWorkout('${divId}')>Clike me to update</button>`
      hDiv.appendChild(updateBtn);

      const confirmBtn = document.createElement("div");
      confirmBtn.className = "confirm";
      confirmBtn.innerHTML = `
      <button onclick=confirmUpdatedWorkout('${divId}','${workoutId}')>confirm</button>`
      confirmBtn.style.display = "none";
      hDiv.appendChild(confirmBtn);
      historyDiv.appendChild(hDiv);
    }
  }

  async function fetchTemplates () {
    console.log("FetchTemplates");
    const res = await fetch("./getTemplates");
    const templates = await res.json();
    renderTemplates(templates);
  }

  const templateDiv = document.querySelector("div.template");
  async function renderTemplates(templates) {
    console.log("Render Templates");
    templateDiv.innerHTML = "";
    const template = document.createElement("div");
    for(let t of templates) {
      const tDiv = document.createElement("table");
      tDiv.className = "table";
      tDiv.innerHTML = `
          <tbody>
            <tr>
              <td>Major Muscle:  ${t.MajorMuscle}</td>
              <td></td>
              <td>Body Part:  ${t.BodyPart}</td>
              <td></td>
            </tr>
      `;
      const exerciesesInTemplates = t.Exercises;
      const excTable = document.createElement("table");
      excTable.innerHTML = `<tbody>`;
      for (let exc of exerciesesInTemplates) {
        tDiv.innerHTML += `
        <tr>
          <td>Exercise Name: </td>
          <td>${exc.name}</td>
          <td>${exc.setNum} Sets </td>
          <td>${exc.repNum} Reps</td>
        </tr>
        `;
      }
      tDiv.innerHTML += `</tbody>`;
      //tDiv.appendChild(excTable);
      template.appendChild(tDiv);
    }
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "nonWorkBtn";
    deleteBtn.innerHTML = `
    Contact us and upgrade to adding templates!
    `;
    template.appendChild(deleteBtn);
    templateDiv.appendChild(template);
  }

  index.fetchTemplates = fetchTemplates;
  index.fetchHistory = fetchHistory;
  index.fetchExercises = fetchExercises;
  return index;
}

function updateWorkout(divId) {
  console.log(`divId:${divId}`);
  let workoutDiv = document.getElementById(`${divId}`);
  let inputs = workoutDiv.querySelectorAll('input');
  for(let input of inputs) {
    input.readOnly = false;
  }
  let confirmBtn = workoutDiv.querySelector('.confirm');
  console.log(`confirmBtn:${confirmBtn}`);
  confirmBtn.style.display = "block";
}

function selectExercise(exercise) {
  if (!window["tempExerciseSelected"]) {
    window["tempExerciseSelected"] = [];
  }
  window["tempExerciseSelected"].push(exercise);
  renderSelectedExces();
  const wktmodal = document.querySelector(".workoutModal");
  const excmodal = document.querySelector(".exerciseModal");
  excmodal.style.display = "none";
  wktmodal.style.display = "block";
}

function renderSelectedExces() {
  const user = getUser();
  const addedExercises = document.querySelector("div.addedExercises");
  addedExercises.innerHTML = ``;
  let index = 0;
  for (let exc of window["tempExerciseSelected"]) {
    console.log(`exc:${exc} index:${index}`);
    const excDiv = document.createElement("div");
    excDiv.className = "row addedExercise";
    excDiv.innerHTML = `
        <h5 class="addedExercise-name"> <output>${exc}</output></h5>
        <div style="display:flex">
            <form action="/addworkout" class="addedExercise-form" method="POST">
                <input class="user" type="text" name="user" id="user" value="${user.email}" style="display:none"/>
                <label for="setNum"> Set </label> 
                <input class="setNum" type="number" name="setNum" id="setNum"/>
                <label for="weightNum"> Weight </label> 
                <input class="weightNum" type="number" name="weightNum"  id="weightNum"/>
                <label for="repNum"> Reps </label> 
                <input class="repNum" type="number" name="repNum" id="repNum"/>
            </form>
            <button style="display:inline-block" onclick=deleteAction('${index}')>
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
        `;
    addedExercises.appendChild(excDiv);
    index++;
  }
}

function deleteAction(index) {
  let exces = window["tempExerciseSelected"];
  if(exces == undefined) return;
  exces.splice(index, 1);
  renderSelectedExces();
}

async function getUser() {
  const res = await fetch("/getuser");
  //console.log("this is the res", res);
  const user = await res.json();
  if (user.user) {
    return user.user;
  }
}

const index = Index();
// module.exports = index.fetchExercises();
index.fetchExercises();
index.fetchHistory();
index.fetchTemplates();
