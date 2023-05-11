const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("hi");
  const q1_value = parseInt(
    document.querySelector("#question1").value.trim(),
    10
  );
  const q2_value = parseInt(
    document.querySelector("#question2").value.trim(),
    10
  );
  const q3_value = parseInt(
    document.querySelector("#question3").value.trim(),
    10
  );
  const q4_value = parseInt(
    document.querySelector("#question4").value.trim(),
    10
  );
  const day_id = Number(document.querySelector(".day-id").dataset.dayId);
  const user_id = Number(document.querySelector(".user-id").dataset.userId);
  if ((q1_value && q2_value && q3_value && q4_value, day_id)) {
    const response = await fetch(`/api/scores`, {
      method: "POST",
      body: JSON.stringify({ q1_value, q2_value, q3_value, q4_value, day_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("I'm in");
      const dayResponse = await fetch(`/api/days/${day_id}`, {
        method: "PUT",
        body: JSON.stringify({
          checklist_complete: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (dayResponse) {
        document.location.replace("/dashboard");
      }
    } else {
      alert("Failed to submit answers to daily check-in");
    }
  }
};

document.querySelector("#questions").addEventListener("submit", newFormHandler);

const questions = [
  {
    id: 1,
    question: "How well did you sleep last night?",
    answers: [
      "1 - Very poorly",
      "2 - Somewhat poorly",
      "3 - Somewhat well",
      "4 - Very well",
    ],
  },
  {
    id: 2,
    question: "How would you rate your mood today?",
    answers: [
      "1 - Very low",
      "2 - Somewhat low",
      "3 - Somewhat high",
      "4 - Very high",
    ],
  },
  {
    id: 3,
    question: "Have you felt overwhelmed or anxious today?",
    answers: [
      "1 - Yes, a lot",
      "2 - Yes, somewhat",
      "3 - No, not really",
      "4 - No, not at all",
    ],
  },
  {
    id: 4,
    question: "Have you engaged in any physical activity today?",
    answers: [
      "1 - No",
      "2 - Yes, a little",
      "3 - Yes, moderate amount",
      "4 - Yes, a lot",
    ],
  },
];

const questionContainer = document.querySelector("#questions");

function updateQuestions() {
  // Update the question text and answer options in the HTML
  questions.forEach((question) => {
    questionContainer.innerHTML += `<div class="field">
          <label class="label" for="question${question.id}">${
      question.question
    }</label> 
          <select name="question${question.id}" id="question${question.id}">
            ${question.answers.map(
              (answer) => `<option value="${answer}">${answer}</option>`
            )}
          </select>
        </div>`;
  });
  questionContainer.innerHTML += `<div class="field is-grouped is-grouped-right">
  <button type="submit" class="button is-primary">Submit</button>
</div>`;
}
// Call the functions when the page loads
updateQuestions();
