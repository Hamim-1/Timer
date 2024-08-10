const startBtn = document.getElementById('start-btn');
const resumeBtn = document.getElementById('resume-btn');
const resetBtn = document.getElementById('reset-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const mainSection = document.getElementById('main-section');
const secondInput = document.getElementById('second-input');
const miniuteInput = document.getElementById('miniute-input');
const hourInput = document.getElementById('hour-input');
const audio = document.getElementById('audio');
pauseBtn.style.display = 'none';
resetBtn.style.display = 'none';
resumeBtn.style.display = 'none';
restartBtn.style.display = 'none';
let second;
let miniute;
let hour;
let timer;

function checkInputIsNotNegative(input, limit) {
    if (limit > Number(input.value)) {
        input.value = Number.parseInt(input.value);
    } else {
        input.value = '';
    }
}

secondInput.addEventListener('input', () => {
    checkInputIsNotNegative(secondInput, 60);
})

miniuteInput.addEventListener('input', () => {
    checkInputIsNotNegative(miniuteInput, 60);
})

hourInput.addEventListener('input', () => {
    checkInputIsNotNegative(hourInput, 24);
})

function hourDecrement() {
    if (hour > 0) {
        hour--;
        hourInput.value = hour < 10 ? `0${hour}` : hour;
        miniute = 59;
        second = 59;
        secondInput.value = second;
        miniuteInput.value = miniute;
    } else if (hour === 0 && miniute === 0 && second === 0) {
        endTimer();
    }
}

function miniuteDecrement() {
    if (miniute < 1) {
        hourDecrement();
    } else {
        miniute--;
        second = 59;
        secondInput.value = second;
        miniuteInput.value = miniute < 10 ? `0${miniute}` : miniute;
    }
}

function endTimer() {
    clearInterval(timer);
    audio.play();
    mainSection.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
}


function startTime() {
    second = secondInput.value == '' ? 0 : Number(secondInput.value);
    miniute = miniuteInput.value == '' ? 0 : Number(miniuteInput.value);
    hour = hourInput.value == '' ? 0 : Number(hourInput.value);
    secondInput.value = second < 10 ? `0${second}` : second;
    miniuteInput.value = miniute < 10 ? `0${miniute}` : miniute;
    hourInput.value = hour < 10 ? `0${hour}` : hour;
    timer = setInterval(() => {
        if (second < 1) {
            miniuteDecrement();
        } else {
            second--;
            secondInput.value = second < 10 ? `0${second}` : second;
        }
    }, 1000);

}

function resetTimer() {
    clearInterval(timer);
    resetBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';

    second = 0;
    miniute = 0;
    hour = 0;
    secondInput.value = '';
    miniuteInput.value = '';
    hourInput.value = '';
}
function pauseTimer() {
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';

    clearInterval(timer);
}
function resumeTimer() {
    pauseBtn.style.display = 'inline-block';
    resumeBtn.style.display = 'none';

    startTime();
}
function restartTimer() {
    mainSection.style.display = 'block';
    startBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    secondInput.value = '';
    miniuteInput.value = '';
    hourInput.value = '';
    audio.pause();
}


startBtn.addEventListener('click', () => {
    if (secondInput.value != '' || miniuteInput.value != '' || hourInput.value != '') {
        startTime();
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';
    } else {
        console.log(0);
    }
})

resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
restartBtn.addEventListener('click', restartTimer);