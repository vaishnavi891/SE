document.addEventListener("DOMContentLoaded", async () => {
  var calendarEl = document.getElementById("calendar");

  const userId = Number(document.querySelector("#user-data").dataset.userId);

  const response = await fetch(`/api/users/days/${userId}`);
  const data = await response.json();

  const greenDays = [];
  const redDays = [];
  const days = data.days;
  //This filterDays will filter day.checklist_complete for only true values
  const filterDays = days.filter(
    (day) => day.checklist_complete !== undefined && day.checklist_complete
  );
  const mappedDays = filterDays.map((day) => day.score);
  const scores = [];
  filterDays.forEach((day) => {
    scores.push(day.score);
  });

  //For each day of the user assign a color based on the average of the given answers
  console.log(data);
  data.days.forEach((day) => {
    let date = new Date(day.date_created);
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const d = date.getDate();
    const year = date.getFullYear();
    console.log(`${year}-${month}-${d}`);
    const formattedDate = `${year}-${month}-${d}`;
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
    dateClick: function () {
      alert(JSON.stringify(mappedDays, null, 2));
    },
  });

  calendar.render();
});
