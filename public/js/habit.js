const habitList = document.querySelector("#habit-list");
const habitInput = document.querySelector("#habit-name");
const addHabitButton = document.querySelector("#add-habit-button");
addHabitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("hi")
  const habit = habitInput.value;
  const userId = Number(document.querySelector("#user-data").dataset.userId);


  if (habit) {
    try {
      const response = await fetch(`/api/habits/${userId}`)
      const habitData = await response.json();

      let newHabit = habitData.wellbeing_input

      if (newHabit) {
        newHabit.push(habit);
      }
      else{
        newHabit = []
        newHabit.push(habit)
      }
      const updateHabit = {
        wellbeing_input: newHabit,
        user_id: userId
      }


      const response2 = await fetch(`/api/habits/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateHabit),
        headers: { "Content-Type": "application/json" },
      });
      if (response2.ok) {
        console.log(newHabit)
        habitList.innerHTML = newHabit
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

