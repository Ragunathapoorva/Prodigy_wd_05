// script.js
const apiKey = ('81e3777d6fa59a29be8aa87899ac73de'); // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weather-info');
const getWeatherButton = document.getElementById('get-weather-btn');
const locationInput = document.getElementById('location-input');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = 'Error fetching weather data';
        });
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, main, weather } = data;
        weatherContainer.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Pressure: ${main.pressure} hPa</p>
        `;
    } else {
        weatherContainer.innerHTML = 'Location not found';
    }
}
