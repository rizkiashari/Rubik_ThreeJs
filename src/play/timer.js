var hours = 0;
var minutes = 0;
var seconds = 0;
var interval = null;

let isPlaying = false;

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
    
    document.querySelector(".backgrounds").style.display = "none";
    document.querySelector(".input-timer").style.display = "none";
    shuffle();
    isPlaying = true;
    
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
            isPlaying = false;
            setTimeout(() => {
                document.querySelector(".backgrounds").style.display = "flex";
                document.querySelector(".input-timer").style.display = "flex";
                document.getElementById("status").innerHTML = "Game Over";
            },5000)
        }else if(cube.checkGameStatus()){
            clearInterval(interval);
            isPlaying = false;
            setTimeout(() => {
                document.querySelector(".backgrounds").style.display = "flex";
                document.querySelector(".input-timer").style.display = "flex";
                document.getElementById("status").innerHTML = "You Win";
            },1000)
        }
    }, 1000);

    
});