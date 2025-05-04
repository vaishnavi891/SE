document.querySelector('#questions').addEventListener('submit', async (event) => {
  event.preventDefault();

  const dayId = document.querySelector('.day-id').getAttribute('data-day-id');
  const userId = document.querySelector('.day-id').getAttribute('data-user-id');

  const answers = [
    Number(document.querySelector('#q1').value),
    Number(document.querySelector('#q2').value),
    Number(document.querySelector('#q3').value),
    Number(document.querySelector('#q4').value),
  ];

  try {
    // Save scores
    const scoreResponse = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify({
        day_id: dayId,
        q1_value: answers[0],
        q2_value: answers[1],
        q3_value: answers[2],
        q4_value: answers[3],
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!scoreResponse.ok) throw new Error('Failed to save scores');

    // Mark checklist complete
    const dayResponse = await fetch(`/api/days/${dayId}`, {
      method: 'PUT',
      body: JSON.stringify({ checklist_complete: true }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!dayResponse.ok) throw new Error('Failed to update day');

    // Get mood history and show chart
    const moodResponse = await fetch(`/api/scores/mood-history/${userId}`);
    if (!moodResponse.ok) throw new Error('Failed to fetch mood history');
    const moodData = await moodResponse.json();
    renderEmotionChart(moodData);

    // Show personalized micro-goal
    showMicroGoals(answers);

  } catch (error) {
    console.error(error);
    alert('Error submitting your responses. Please try again.');
  }
});

function renderEmotionChart(moodData) {
  const ctx = document.getElementById('emotionChart').getContext('2d');
  if (window.emotionChartInstance) {
    window.emotionChartInstance.destroy();
  }
  window.emotionChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: moodData.dates,
      datasets: [{
        label: 'Mood Score',
        data: moodData.scores,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      }],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
  document.getElementById('emotion-chart-container').style.display = 'block';
}

function showMicroGoals(answers) {
  const microGoals = [
    'Drink 2 glasses of water',
    'Take a 5-minute walk',
    'Text someone you trust',
    'Watch one motivational video',
  ];

  const minAnswerIndex = answers.indexOf(Math.min(...answers));
  const goal = microGoals[minAnswerIndex] || microGoals[0];

  console.log("Selected Micro Goal:", goal); // ✅ Debug log

  const microGoalText = document.getElementById('micro-goal-text');
  microGoalText.textContent = goal;

  const container = document.getElementById('micro-goals-container');
  if (container) container.style.display = 'block';
}
