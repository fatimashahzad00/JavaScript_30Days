const apiKey = "473f14696e239021a5550446cae2ac3d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

const weather_icon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else {
        let data = await response.json(); console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            weather_icon.src = 'images/clouds.png';
        } else if (data.weather[0].main == 'Clear') {
            weather_icon.src = 'images/clear.png';
        }
        else if (data.weather[0].main == 'Drizzle') {
            weather_icon.src = 'images/drizzle.png';
        }
        else if (data.weather[0].main == 'Mist') {
            weather_icon.src = 'images/mist.png';
        }
        else if (data.weather[0].main == 'Rain') {
            weather_icon.src = 'images/rain.png';
        }
        else if (data.weather[0].main == 'Snow') {
            weather_icon.src = 'images/snow.png';
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = 'none';
    }
}



searchButton.addEventListener('click', () => checkWeather(searchInput.value))