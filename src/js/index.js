var audio = new Audio("res/alarmSound.mp3");
audio.loop = true;

$(".alarmDiv").hide();

$('#radioHolder').change(function () {
    if ($('#timerRadio').prop('checked')) {
        $('.timerDiv').show();
        $('.alarmDiv').hide();
    } else if ($('#alarmRadio').prop('checked')) {
        $('.alarmDiv').show();
        $('.timerDiv').hide();
    }
});
$(".textImput").keydown(function (evt) {
    var key = evt.keyCode;
    key = String.fromCharCode(key);
    var regex = /[0-9\b]/;
    if (!regex.test(key)) {
        evt.preventDefault();
    }
});

$("#alarmMinutes, #timerMinutes, #timerSeconds,#alarmHours").change(function (e) {
    if ($("#timerMinutes").val() > 59) {
        $("#timerMinutes").val(59);
    } else if ($("#timerSeconds").val() > 59) {
        $("#timerSeconds").val(59);
    } else {
        if ($("#alarmMinutes").val() > 59) {
            $("#alarmMinutes").val(59);
        }
        if (($("#alarmHours").val() > 23 || $("#alarmHours").val() === "")&& $(".alarmDiv").css('display') == 'block') {
            $("#alarmHours").val(new Date().getHours());
        }
    }
});

$(document).on('keydown', function (evt) {
    if (evt.which == 13) {
        if ($(".timerDiv").css('display') == 'block') {
            $("#timerButton").click();
        } else if ($(".alarmDiv").css('display') == 'block') {
            $("#alarmButton").click();
        }
    }
});

$("#timerButton").click(function () {
    timer();
});

$("#alarmButton").click(function () {
    alarm();
});

function secondsToString(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    if (h === 0) { h = "00"; }
    return h + ":" + m + ":" + s;
}
var interval;
function timer() {
    resetInterval("alarm");
    if ($("#timerButton").text() === "START") {
        var readHours = isNaN(parseInt($("#timerHours").val())) ? 0 : parseInt($("#timerHours").val());
        var readMinutes = isNaN(parseInt($("#timerMinutes").val())) ? 0 : parseInt($("#timerMinutes").val());
        var readSeconds = isNaN(parseInt($("#timerSeconds").val())) ? 0 : parseInt($("#timerSeconds").val());
        var totalTimeInSeconds = readSeconds + 60 * readMinutes + 3600 * readHours;
        if (totalTimeInSeconds > 0) {
            $("#timerButton").text("STOP");
            $(".timerTime").text(secondsToString(totalTimeInSeconds));
            interval = setInterval(function () {
                totalTimeInSeconds--;
                $(".timerTime").text(secondsToString(totalTimeInSeconds));
                if (totalTimeInSeconds === 0) {
                    clearInterval(interval);
                    $(".timerTime").text("FINISHED");
                    audio.play();
                }
            }, 1000);
        }
    }
    else if ($("#timerButton").text() === "STOP") {
        resetInterval("timer");
        audio.pause();
        audio.currentTime = 0;
    }
}

function alarm() {
    resetInterval("timer");
    if ($("#alarmButton").text() === "START") {
        var readHours = parseInt($("#alarmHours").val());
        var readMinutes = isNaN(parseInt($("#alarmMinutes").val())) ? 0 : parseInt($("#alarmMinutes").val());
        var now = new Date();
        var targetDate = new Date();
        targetDate.setHours(readHours, readMinutes, 0);
        var difference = (targetDate.getTime() - now.getTime()) / 1000;
        if (difference > 0) {
            $("#alarmButton").text("STOP");
            $(".alarmTime").text(secondsToString(difference));
            interval = setInterval(function () {
                difference--;
                $(".alarmTime").text(secondsToString(difference));
                if (difference === 0) {
                    clearInterval(interval);
                    $(".alarmTime").text("FINISHED");
                    audio.play();
                }
            }, 1000);
        } else {
            $(".alarmTime").text("Please enter correct time");
        }
    }
    else if ($("#alarmButton").text() === "STOP") {
        resetInterval("alarm");
        audio.pause();
        audio.currentTime = 0;
    }
}

function resetInterval(panel) {
    if (panel === "alarm") {
        clearInterval(interval);
        $("#alarmButton").text("START");
        $(".alarmTime").text("00:00:00");
    } else if (panel === "timer") {
        clearInterval(interval);
        $("#timerButton").text("START");
        $(".timerTime").text("00:00:00");
    }
}
document.addEventListener('click', function (e) { if (document.activeElement.toString() == '[object HTMLButtonElement]') { document.activeElement.blur(); } });