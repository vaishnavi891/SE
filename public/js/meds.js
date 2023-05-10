const medForm = document.querySelector('#medication-form');
const medList = document.querySelector('#medication-list');

// This array will keep track of the habits
let meds = [];

medForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the habit name from the input field
  const medNameInput = document.querySelector('#medication-name');
  const medName = medNameInput.value.trim();

  // Make sure the habit name is not empty
  if (medName === '') {
    return;
  }

  // Create a new checkbox for the habit
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `medication-${medication.length}`;
  checkbox.name = 'medications[]';
  checkbox.value = medName;
  const label = document.createElement('label');
  label.for = checkbox.id;
  label.textContent = medName;

  // Add the checkbox to the list of habits
  habitList.appendChild(checkbox);
  habitList.appendChild(label);

  // Add the habit to the array
  habits.push(habitName);

  // Clear the input field
  habitNameInput.value = '';
});
