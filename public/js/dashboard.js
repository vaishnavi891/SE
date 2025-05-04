document.addEventListener('DOMContentLoaded', () => {
  const userId = document.body.getAttribute('data-user-id');

  async function fetchSummary() {
    try {
      const response = await fetch(`/api/scores/summary/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      const data = await response.json();
      displaySummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  }

  function displaySummary(data) {
    const summaryContainer = document.getElementById('summary-container');
    if (!summaryContainer) return;

    // Clear existing content
    summaryContainer.innerHTML = '';

    // Display average, highest, lowest mood
    const avgMood = document.createElement('p');
    avgMood.textContent = `Average Mood: ${data.averageMood.toFixed(2)}`;
    summaryContainer.appendChild(avgMood);

    const highMood = document.createElement('p');
    highMood.textContent = `Highest Mood: ${data.highestMood.toFixed(2)}`;
    summaryContainer.appendChild(highMood);

    const lowMood = document.createElement('p');
    lowMood.textContent = `Lowest Mood: ${data.lowestMood.toFixed(2)}`;
    summaryContainer.appendChild(lowMood);

    // Display recent scores in a table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.border = '1';

    const headerRow = document.createElement('tr');
    ['Entry', 'Q1', 'Q2', 'Q3', 'Q4', 'Mood'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.recentScores.slice().reverse().forEach((score, index) => {
      const row = document.createElement('tr');
      const entryCell = document.createElement('td');
      entryCell.textContent = `#${index + 1}`;
      row.appendChild(entryCell);

      ['q1_value', 'q2_value', 'q3_value', 'q4_value', 'mood'].forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = score[key];
        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    summaryContainer.appendChild(table);
  }

  fetchSummary();
});
