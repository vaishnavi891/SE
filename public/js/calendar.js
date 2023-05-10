document.addEventListener('DOMContentLoaded', function() {
   var calendarEl = document.getElementById('calendar');

   var calendar = new FullCalendar.Calendar(calendarEl, {
     initialView: 'dayGridMonth',
     eventSources: [
       {
           events: [{
            title: 'my event',
            start: '2018-09-01',
            display: 'background'
           }],
           color: 'red'
         }
   ]
   });
   calendar.render();
 });