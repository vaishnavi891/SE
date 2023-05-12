const habitList = document.querySelector("#habit-list");
const habitInput = document.querySelector("#habit-name");
const addMedButton = document.querySelector("#add-habit-button");
addMedButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("hi")
  const habit = habitInput.value;
  const userId = Number(document.querySelector("#user-data").dataset.userId);


  if (habit) {
    try {
      const response = await fetch(`/api/habits/${userId}`)
      const habitData = await response.json();

      let newMeds = habitData.medicine_input

      if (newMeds) {
        newMeds.push(habit);
      }
      else{
        newMeds = []
        newMeds.push(habit)
      }
      const updateMeds = {
        medicine_input: newMeds,
        user_id: userId
      }


      const response2 = await fetch(`/api/habits/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateMeds),
        headers: { "Content-Type": "application/json" },
      });
      if (response2.ok) {
        console.log(newMeds)
        habitList.innerHTML = newMeds
          .map((habit) => `<input type="checkbox">  ${habit}</input>
          </br>`)
          .join("");
        // Clear the habit input field
        habitInput.value = "";
      } else {
        console.error("Failed to add habit");
        return;
      }
      
    } catch (err) {
      console.error(err);
    }
  }
});

