function Index1() {
    const index = {};
    const historyDiv = document.querySelector("div.history");

    function renderHistory(history) {
        historyDiv.innerHTML = "";
        for(let h of history) {
          const exerciesesArr = h.workout;
          const hDiv = document.createElement("div");
          hDiv.className = "row card";
          hDiv.innerHTML = `
          <div class="date">
            <label> Date: </label> <output>${h.date}</output>
          </div>
          `;
          const workoutDiv = document.createElement("div");
          workoutDiv.className = "workout";
          for(let exc of exerciesesArr) {
            const exerciseDiv = document.createElement("div");
            exerciseDiv.className = "exerciseInWorkout";
            exerciseDiv.innerHTML = `
            <label> Exercise Name: </label><output>${exc.name}</output>
            <label> Weight: </label><output>${exc.weightNum}</output>
            <label> Set: </label><output>${exc.setNum}</output>
            <label> Reps: </label><output>${exc.repNum}</output>
            `;
            hDiv.appendChild(exerciseDiv);
          }
          historyDiv.appendChild(hDiv);
        }
      }

      async function fetchHistory () {
        console.log("FetchHistory");
        const res = await fetch("./getHistory");
        const history = await res.json;
        renderHistory(history);
      }

      index.fetchHistory = fetchHistory;
  return index;
}

const index = Index1();
index.fetchHistory();