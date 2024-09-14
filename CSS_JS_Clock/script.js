


function createHourMarker() {
    const clock = document.querySelector('.clock');
    for (let i = 1; i < 13; i++) {
        // const marker = document.createElement('div');
        // marker.textContent = i === 0? '12' : i;
        // // marker.innerText.style.top = "6px";
        // marker.classList.add('hour-marker');
        // marker.style.transform = `rotate(${i * 30}deg)`;
        // clock.appendChild(marker);

        const number = document.createElement('div');
        number.className = 'hour-number';
        number.textContent = i;
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const radius = 110; // Adjust this value to position the numbers
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        number.style.transform = `translate(${x}px, ${y}px)`;
        clock.appendChild(number);

    }
}


function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const secondsDegrees = (seconds / 60) * 360 + 90;
    const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;

    const secondsHand = document.querySelector('.second-hand');
    const minutesHand = document.querySelector('.minute-hand');
    const hoursHand = document.querySelector('.hour-hand');

    secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function iniitClock() {
    createHourMarker();
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', iniitClock);
