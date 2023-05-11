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
    console.log(day.date_created.substring(0, 10));
    if (day.checklist_complete) {
      let avgScore =
        (day.score.q1_value +
          day.score.q2_value +
          day.score.q3_value +
          day.score.q4_value) /
        4;
      if (avgScore < 2.5) {
        redDays.push({
          start: day.date_created.substring(0, 10),
          display: "background",
        });
      } else {
        greenDays.push({
          start: day.date_created.substring(0, 10),
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
