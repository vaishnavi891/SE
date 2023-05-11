document.addEventListener('DOMContentLoaded', async () => {
  var calendarEl = document.getElementById('calendar');

  const day_id = Number(document.querySelector("#user-data").dataset.userId);

  const response = await fetch(`/api/users/days/${day_id}`);   
  const data = await response.json();
  
  const greenDays = [];
  const redDays = [];

  //For each day of the user assign a color based on the average of the given answers
  data.days.forEach((day) => {
    let avgScore = (day.score.q1_value + day.score.q2_value + day.score.q3_value +day.score.q4_value) / 4
    console.log(day.date_created.substring(0, 10));
    if(avgScore < 3){
      redDays.push({
        start: day.date_created.substring(0, 10),
        display : 'background'
      });
    }
    else{
      greenDays.push({
        start: day.date_created.substring(0, 10),
        display : 'background'
      });
    }
  });

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    eventSources: [
      {
        events: redDays,
        color: 'red',
        textColor : 'black'
      },
      {
        events: greenDays,
        color: 'green',
        textColor : 'black'
      }
    ]
  });
  calendar.render();
});