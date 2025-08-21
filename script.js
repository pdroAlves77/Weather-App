const container = document.querySelector('.container');
const form = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

let lastCity = ""; 

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const APIKey = 'afa7934c4940e3fc4778096437a0286f';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === "") {
        return;
    }

    
    if (lastCity.toLowerCase() === city.toLowerCase()) {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404' || json.cod === 404) {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error.classList.add('active');
                lastCity = ""; 
                return;
            }

            lastCity = city;

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error.classList.remove('active');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

       
            document.querySelectorAll('#clone-info-weather, #clone-info-humidity, #clone-info-wind').forEach(el => el.remove());

            
            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');
            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');
            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
                infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
                infoWind.insertAdjacentElement('afterend', elCloneInfoWind);

                setTimeout(() => {
                    elCloneInfoWeather.classList.remove('active-clone');
                    elCloneInfoHumidity.classList.remove('active-clone');
                    elCloneInfoWind.classList.remove('active-clone');
                    setTimeout(() => {
                        elCloneInfoWeather.remove();
                        elCloneInfoHumidity.remove();
                        elCloneInfoWind.remove();
                    }, 1000);
                }, 1200);
            }, 2200);
        });
});