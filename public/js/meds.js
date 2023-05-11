// const medForm = document.querySelector("#medication-form");
// const medList = document.querySelector("#medication-list");

// // This array will keep track of the medicines
// let meds = [];

// medForm.addEventListener("submit", (event) => {
//   // Prevent the form from submitting
//   event.preventDefault();

//   // Get the medicine name from the input field
//   const medNameInput = document.querySelector("#medication-name");
//   const medName = medNameInput.value.trim();

//   // Make sure the medicine name is not empty
//   if (medName === "") {
//     return;
//   }

//   // Create a new checkbox for the medicine
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.id = `medication-${medication.length}`;
//   checkbox.name = "medications[]";
//   checkbox.value = medName;
//   const label = document.createElement("label");
//   label.for = checkbox.id;
//   label.textContent = medName;

//   // Add the checkbox to the list of medicines
//   medList.appendChild(checkbox);
//   medList.appendChild(label);

//   // Add the medicine to the array
//   meds.push(medName);

//   // Clear the input field
//   medNameInput.value = "";
// });
const medicationList = document.querySelector("#medication-list");
const medicationInput = document.querySelector("#medication-name");
const form = document.querySelector("#medication-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const medication = medicationInput.value;
  if (medication) {
    try {
      const response = await fetch(`/api/medications/`, {
        method: "POST",
        body: JSON.stringify({ medication }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const medications = await response.json();
        medicationList.innerHTML = medications
          .map((medication) => `<li>${medication.name}</li>`)
          .join("");
        // Clear the medication input field
        medicationInput.value = "";
      } else {
        console.error("Failed to add medication");
      }
    } catch (err) {
      console.error(err);
    }
  }
});

