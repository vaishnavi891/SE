document.addEventListener("DOMContentLoaded", async () => {
  var calendarEl = document.getElementById("calendar");

  const userId = Number(document.querySelector("#user-data").dataset.userId);

  const response = await fetch(`/api/users/days/${userId}`);
  const data = await response.json();

  const greenDays = [];
  const redDays = [];

  //For each day of the user assign a color based on the average of the given answers
  console.log(data);
  data.days.forEach((day) => {
    let date = new Date(day.date_created);
    let month = date.getMonth() + 1;
    if(month < 10){
      month = `0${month}`
    }
    const d = date.getDate();
    const year = date.getFullYear();
    console.log(`${year}-${month}-${d}`)
    const formattedDate = `${year}-${month}-${d}`
    if (day.checklist_complete) {
      let avgScore =
        (day.score.q1_value +
          day.score.q2_value +
          day.score.q3_value +
          day.score.q4_value) /
        4;
      if (avgScore < 2.5) {
        redDays.push({
          start: formattedDate,
          display: "background",
        });
      } else {
        greenDays.push({
          start: formattedDate,
          display: "background",
        });
      }
    }
  });

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    eventSources: [
      {
        events: redDays,
        color: "red",
        textColor: "black",
      },
      {
        events: greenDays,
        color: "green",
        textColor: "black",
      },
    ],
  });
  calendar.render();
});
