const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "7ecbcfc5912359e54c3c1271a7f8ff42"

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");


const getCurrentWeatherByName = async city => {
    const url =`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    console.log(url);
    const response = await fetch(url)
    const json = await response.json();
    return json;
}

const renderCurrentWeather = data => {
    console.log(data);
    const weatherJsx = `
    <h1 class="font-extrabold text-indigo-900 text-[2rem] mb-5">
        ${data.name},${data.sys.country}
    </h1>
    <div class="w-full flex justify-center items-center mb-5">
        <img src="https://www.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
        <span class="mx-2 text-center text-gray-500">${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div class="w-full flex justify-evenly items-center">
        <p> Humidity: <span class="text-indigo-400 ml-1.5">${data.main.humidity} %</span></p>
        <p> wind speed: <span class="text-indigo-400 ml-1.5">${data.wind.speed} %</span></p>
    </div>
    `
    weatherContainer.innerHTML = weatherJsx;
}

const searchHandler = async () => {
    const cityName = searchInput.value;
    if (!cityName) {
        alert("Please select a city");
    }
    const currentData = await getCurrentWeatherByName(cityName)
    renderCurrentWeather(currentData);
}
searchButton.addEventListener("click", searchHandler)