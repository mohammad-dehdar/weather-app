const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "7ecbcfc5912359e54c3c1271a7f8ff42"
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const loacationIcon = document.getElementById("location");

const getCurrentWeatherByName = async city => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json();
    return json;
}

const getCurrentWeatherByCoordinates = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json();
    return json;
}

const getForecastWeatherByCoordinates = async (lat,lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json();
    return json;
}
const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json();
    return json;
}


const renderCurrentWeather = data => {
    const weatherJsx = `
    <h1 class="font-extrabold text-indigo-900 text-[2rem] mb-5">
        ${data.name}, ${data.sys.country}
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

const getWeekDay = date => {
    return DAYS[new Date(date *1000).getDay()];
}

const renderForecastWeather = (data) => {
    forecastContainer.innerHTML = "";
    data = data.list.filter (obj => obj.dt_txt.endsWith("12:00:00"))
    data.forEach(i => {
        const forecastJsx = `
            <div class="w-[150px] pt-5 px-2.5 pb-8 text-center rounded-xl shadow-indigo-200 shadow-2xl">
                <img src="https://www.openweathermap.org/img/w/${i.weather[0].icon}.png" alt="weather icon" class="m-auto">
                <h3 class="text-indigo-900 mb-8">${getWeekDay(i.dt)}</h3>
                <p class="mb-2.5">${Math.round(i.main.temp)} °C</p>
                <span class="text-indigo-400">${i.weather[0].main}</span>
            </div>
        `
        forecastContainer.innerHTML += forecastJsx;
    })
    
}

const searchHandler = async () => {
    const cityName = searchInput.value;
    if (!cityName) {
        alert("Please select a city");
    }
    const currentData = await getCurrentWeatherByName(cityName)
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByName(cityName)
    console.log(forecastData);
    renderForecastWeather(forecastData)
}

const positionCallback = async position => {
    const { latitude, longitude } = position.coords
    const currentData = await getCurrentWeatherByCoordinates(latitude, longitude)
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByCoordinates(
        latitude,
        longitude
    )
    renderForecastWeather(forecastData)
}

const errorCalback = error => {
    console.log(error.message);
}

const locationHandler = () => {
    if (navigator) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCalback)
    } else {
        alert("you browser dose not support location");
    }

}

loacationIcon.addEventListener('click', locationHandler)
searchButton.addEventListener("click", searchHandler)