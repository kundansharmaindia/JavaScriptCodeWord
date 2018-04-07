/**
 * Function used to set default start time and end time in UI
 * Author:Kundan Lal
 */
function setDefaultStartAndEndTime() {
    var startTime = getSystemTimeInfo();
    $('#timepicker1').timepicker().val(startTime);
    fillEndTime();
}

/**
 * Function used to calculate end time based on the start time and fill in
 * the end time in UI automatically when user changes start time.
 * 
 * Author:Kundan Lal
 */
function fillEndTime() {
    var endTime = $("#timepicker2").val();
    var splittedEndTime = endTime.split(":");
    var startTime = $("#timepicker1").val();
    var splittedStartTime = startTime.split(":");

    /**
     * splittedStartTime[0] and splittedStartTime[1] represents hours and minutes.
     * Added condition to check the minutes is 45 or not. If true, then add '1' to hours
     * and '00' to minutes. Otherwise, add only 15 minutes to the start time.
     */
    if (splittedStartTime[1] == '45') {
        var intSplittedStartTime = splittedStartTime[0] * 1;
        //To display '00:00' in end time if '23:45' is selected in start time
        (intSplittedStartTime == 23) ? (splittedEndTime[0] = '00') : (splittedEndTime[0] = intSplittedStartTime + 1);
        splittedEndTime[1] = '00';
    } else {
        splittedEndTime[0] = (splittedStartTime[0] * 1);
        splittedEndTime[1] = (splittedStartTime[1] * 1) + 15;
    }

    var newEndTime = splittedEndTime[0] + ":" + splittedEndTime[1];
    $('#timepicker2').timepicker().val(newEndTime);
}

/**
 * Function used to get the system time and calculate start time and end time automatically
 * and displays the default start time and end time in UI based on the current time.
 * 
 * Author:Kundan Lal
 */
function getSystemTimeInfo() {

    //To get the system time
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();

    var timeStr = "";
    var roundedMin = "";

    //'interval' represents the minutes with 15min difference
    var interval = [0, 15, 30, 45, 60];
    for (var i = 0; i < 5; i++) {
        //To find the minutes difference between system time and meeting time
        var m = min - interval[i];

        /**
         * If difference is less than 5 min, then it will take the previous interval.
         * eg: if system time is 11:02, then start time will be displayed as 11:00.
         * if system time is 11:10, then start time will be displyed as 11:15.
         */
        if (m <= 5) {
            roundedMin = interval[i];
            break;
        } else {
            if (interval[i] >= min) {
                roundedMin = interval[i];
            }
        }
    }

    (roundedMin == 0) ? (roundedMin = '00') : roundedMin;
    if (roundedMin == '60') {
        hour = hour * 1 + 1;
        min = '00';
    } else {
        min = roundedMin;
    }

    timeStr = hour + ":" + min;
    return timeStr;
}

/**
 * Function used to set default start time and end time on selecting particular date.
 * If current date is selected, then current start time and end time will be displayed.
 * Otherwise, default start time(09:00) and end time(09:15) will be displayed.
 * 
 * Author:Kundan Lal
 */
function setDefaultTimeOnDateSelection() {

    //To get the selected date
    var selectedDate = document.getElementById('bdate').value;
    selectedDate = selectedDate.replace(/-/g, '');

    //To get the system date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day <= 9) {
        day = '0' + day;
    }
    if (month <= 9) {
        month = '0' + month;
    }
    var systemDate = "" + day + month + year;

    //Added condition to check systemDate and selected date is same or not
    if (selectedDate == systemDate) {
        setDefaultStartAndEndTime();
    } else {
        $('#timepicker1').timepicker().val('09:00');
        $('#timepicker2').timepicker().val('09:15');
    }
}
