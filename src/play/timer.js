var hours = 0;
var minutes = 0;
var seconds = 0;
var interval = null;

document.getElementById('hours').addEventListener('change', e => {
    hours = +e.target.value;
});

document.getElementById('minutes').addEventListener('change', e => {
    minutes = +e.target.value;
});

document.getElementById('seconds').addEventListener('change', e => {
    seconds = +e.target.value;
});

document.getElementById('startTimer').addEventListener('click', () => {
    
    shuffle();
    
    var timeInSeconds = (hours * 60 * 60) +
        (minutes * 60) +
        seconds;

    var displayTime = () => {
        var displayHours = Math.floor(timeInSeconds / (60 * 60));
        var remainder = timeInSeconds - (displayHours * 60 * 60);
        var displayMinutes = Math.floor(remainder / 60);
        var displaySeconds = remainder - (displayMinutes * 60);

        setTimeout(() => {
            document.getElementById("timer").innerHTML = displayHours + " : " + displayMinutes + " : " + displaySeconds;
        },5000)
        
    };
    interval = setInterval(() => {
        displayTime();
        timeInSeconds -= 1;
        if (timeInSeconds < 0) {
            clearInterval(interval);
        }
    }, 1000);

    
});