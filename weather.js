const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const form = document.querySelector('.form');
const cityNameDisplay = document.getElementById('cityName');
const weatherDisplay = document.getElementById('weather');
const tempDisplay = document.getElementById('temp');
const humidityDisplay = document.getElementById('humidity');
const emojiDisplay = document.getElementById('emoji');
const errorMsgDisplay = document.getElementById('errorMsg');

const apiKey = 'be7b0ea04abb215ae285a635f4af70a7';

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError('Error fetching weather data. Please try again later.');
        }
    }else{
        displayError('Please enter a city name.');
    }
    if(city.length === 0){
        displayError('Please enter a city name.');
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
   
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
}

function displayWeatherInfo(data) {
    const { name: city , main:{temp,humidity}, weather: [{description ,id}] }= data;

    errorMsgDisplay.textContent = '';
    cityNameDisplay.textContent = city;
    tempDisplay.textContent = `Temp: ${temp.toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    emojiDisplay.textContent = getWeatherEmoji(id);
    weatherDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
}
function getWeatherEmoji(WeatherId) {
    switch (true){
        case(WeatherId >= 200 && WeatherId < 300):
            return '🌤';
        case(WeatherId >= 300 && WeatherId < 400):
            return '🌥';
        case(WeatherId >= 500 && WeatherId < 600):
            return '🌦';
        case(WeatherId >= 600 && WeatherId < 700):
            return '❄️';
        case(WeatherId >= 700 && WeatherId < 800):
            return '🌨';
        case(WeatherId ===800):
            return '☀️';
        case(WeatherId > 800 && WeatherId < 805):
            return '🌪';
        default:
            return '❓';
    }
}
function displayError(message) {
    
    cityNameDisplay.textContent = "";
    tempDisplay.textContent = "";
    humidityDisplay.textContent = "";
    emojiDisplay.textContent = "";
    weatherDisplay.textContent = "";
    errorMsgDisplay.textContent = message;
}