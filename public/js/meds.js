const medicationList = document.querySelector("#medication-list");
const medicationInput = document.querySelector("#medication-name");
const addMedButton = document.querySelector("#add-medication-button");
addMedButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("hi")
  const medication = medicationInput.value;
  const userId = Number(document.querySelector("#user-data").dataset.userId);


  if (medication) {
    try {
      const response = await fetch(`/api/medications/${userId}`)
      const medicationData = await response.json();

      const newMeds = medicationData.medicine_input
      newMeds.push(medication);

      const updateMeds = {
        medicine_input : newMeds,
        user_id : userId
      }


      const response2 = await fetch(`/api/medications/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateMeds),
        headers: { "Content-Type": "application/json" },
      });
      if (response2.ok) {
        console.log(newMeds)
        medicationList.innerHTML =  newMeds
          .map((medication) => `<input type="checkbox">  ${medication}</input>
          </br>`)
          .join("");
        // Clear the medication input field
        medicationInput.value = "";
      } else {
        console.error("Failed to add medication");
        return;
      }
      // document.location.reload()

    } catch (err) {
      console.error(err);
    }
  }
});

