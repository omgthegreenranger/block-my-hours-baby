//HEY STEVE, DON'T FORGET TO VALIDATE THE DAY IN ORDER TO SAVE FUTURE EVENTS TO LOCAL STORAGE, TOO!

// declare all variables

let dayStart = '';
let dayEnd = '';
let dayLength = [];
let scheduleHours = document.querySelector("#hour-boxes");
let timesArrow = '';
let schedules = localStorage.schedules ? JSON.parse(localStorage.schedules) : [];
let scheduleToday = [];
let timeBlock = $('#hour-boxes');
let btnHour = '';
let details = '';

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$('#currentDay').text("Today is " + dayjs().format("MMM DD, YYYY") + ", and here is your schedule");
$('#currentTime').text("It is currently " + dayjs().format("hh:mm a"));

$(function init() {
    //grab the localStorage and apply to the rooms.
    for (i = 0; i < schedules.length; i++) {
        if(schedules[i][0] == dayjs().format("DD-MM-YYYY")) {
            
            scheduleToday.push([schedules[i][1][0],schedules[i][1][1]]);
        }
    }
}
);

// write a script to populate all the hours of the day
// note that dayStart and dayEnd are variables in order to provide workday-hour select.
$(function () {
    dayStart = 9;
    dayEnd = 17;
    for (let i = dayStart; i <= dayEnd; i++) {
        // determine if time is past or present
        if(i < dayjs().format("HH")) {
            timesArrow = "past";
        } else if (i == dayjs().format("HH")) {
            timesArrow = "present";
        } else if (i > dayjs().format("HH")) {
            timesArrow ="future";
        };
        
        for (let j = 0; j < scheduleToday.length; j++) {
            if(i == parseInt(scheduleToday[j][0])) {
                details = scheduleToday[j][1];
                console.log("Working!");
            } else {
                details = "";
            }
        };

        dayDiv = `<div id="hour-${i}" class="row time-block ${timesArrow}">
    <div class="col-2 col-md-1 hour text-center py-3">${i}AM</div>
    <textarea class="col-8 col-md-10 description" rows="3">${details}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
</div>`
        scheduleHours.innerHTML += dayDiv;
        };
      
});

timeBlock.on('click', '.saveBtn', function (event) {
    btnClicked = $(event.target);
    btnHour = btnClicked.parent().attr('id').split("-")[1];
    btnDetails = btnClicked.parent().children('textarea').val();
    today = dayjs().format("DD-MM-YYYY")
    
    for(i = 0; i < scheduleToday.length; i++){
        if(btnHour == scheduleToday[0][0]) {
            console.log("Sorry, you can't have more than one");
            return;
        }
    }
    
    schedules.push([today,[btnHour, btnDetails]]);



    localStorage.setItem("schedules", JSON.stringify(schedules));
});
