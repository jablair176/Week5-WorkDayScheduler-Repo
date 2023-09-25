// Wraped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Will save users text input to localStorage when saveBtn is clicked.
  function textInput() {
    $('.saveBtn').on('click', function() {
      var hourField = $(this).parent().attr('id');
      var textValue = $(this).siblings('.description').val();
      localStorage.setItem(hourField, textValue);
    });
  }
  // Applies past present and future class colors relative to current time
  var currentHour = dayjs().format('H');

  function timeColor() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // Retrieves input from localStorage and sets to corresponding time block
  $('.time-block').each(function() {
    var hourField = $(this).attr('id');
    var textValue = localStorage.getItem(hourField);
    $(this).children('.description').val(textValue);
  });

  // Displays the current date and time in the header of the page.
  function refreshDateTime() {
    var dateEl = $('#date');
    var timeEl = $('#time');
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('hh:mm:ss A');
    dateEl.text(currentDate);
    timeEl.text(currentTime);
    
  }
  // Calling functions for storing text input to localStorage and setting hourly block color and refreshing time in header.
  textInput();
  timeColor();
  setInterval(refreshDateTime, 1000);
  
});
