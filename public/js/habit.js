const habitForm = document.querySelector('#habit-form');
const habitList = document.querySelector('#habit-list');

// This array will keep track of the habits
let habits = [];

habitForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the habit name from the input field
  const habitNameInput = document.querySelector('#habit-name');
  const habitName = habitNameInput.value.trim();

  // Make sure the habit name is not empty
  if (habitName === '') {
    return;
  }

  // Create a new checkbox for the habit
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `habit-${habits.length}`;
  checkbox.name = 'habits[]';
  checkbox.value = habitName;
  const label = document.createElement('label');
  label.for = checkbox.id;
  label.textContent = habitName;

  // Add the checkbox to the list of habits
  habitList.appendChild(checkbox);
  habitList.appendChild(label);

  // Add the habit to the array
  habits.push(habitName);

  // Clear the input field
  habitNameInput.value = '';
});
