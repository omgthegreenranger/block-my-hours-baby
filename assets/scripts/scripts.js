//HEY STEVE, DON'T FORGET TO VALIDATE THE DAY IN ORDER TO SAVE FUTURE EVENTS TO LOCAL STORAGE, TOO!

// declare all variables

let dayStart = '';
let dayEnd = '';
let dayLength = [];
let scheduleHours = document.querySelector("#hour-boxes");
let timesArrow = '';
let schedules = localStorage.schedules ? JSON.parse(localStorage.schedules) : [];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$('#currentDay').text("Today is " + dayjs().format("MMM DD, YYYY") + ", and here is your schedule");
$('#currentTime').text("It is currently " + dayjs().format("hh:mm a"));

// TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  

// write a script to populate all the hours of the day
// note that dayStart and dayEnd are variables in order to provide workday-hour select.
$(function () {
    dayStart = 9;
    dayEnd = 17;
    for (i = dayStart; i <= dayEnd; i++) {
        // determine if time is past or present
        if(i < dayjs().format("hh")) {
            timesArrow = "past";
        } else if (i == dayjs().format("hh")) {
            timesArrow = "present";
        } else if (i > dayjs().format("hh")) {
            timesArrow ="future";
        };
    dayDiv = `<div id="hour-${i}" class="row time-block ${timesArrow}">
    <div class="col-2 col-md-1 hour text-center py-3">${i}AM</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
</div>`
        scheduleHours.innerHTML += dayDiv;
        }

    }
);


let timeBlock = $('#hour-boxes');

timeBlock.on('click', '.saveBtn', function (event) {
    btnClicked = $(event.target);
    schedules.push([btnClicked.parent().attr('id'),btnClicked.parent().children('textarea').val()]);
    localStorage.setItem("schedules", JSON.stringify(schedules));
});
