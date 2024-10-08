import { getWeekDay } from "./customDate.js";
import getWeatherData from "./httpReq.js";
import { removeModal, showModal } from "./modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const loacationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-button")

const renderCurrentWeather = data => {
    if (!data) {
        return;
    }
    const weatherJsx = `
    <h1 class="font-extrabold text-indigo-900 text-[2rem] mb-5">
        ${data.name}, ${data.sys.country}
    </h1>
    <div class="w-full flex justify-center items-center mb-5">
        <img src="https://www.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
        <span class="mx-2 text-center text-gray-500">${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div class="w-full flex justify-evenly items-center max-sm:flex-col gap-2">
        <p> Humidity: <span class="text-indigo-400 ml-1.5">${data.main.humidity} %</span></p>
        <p> wind speed: <span class="text-indigo-400 ml-1.5">${data.wind.speed} %</span></p>
    </div>
    `
    weatherContainer.innerHTML = weatherJsx;
}

const renderForecastWeather = (data) => {
    if (!data) {
        return;
    }
    forecastContainer.innerHTML = "";
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"))
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
        showModal("Please enter a city name!");
        return;
    }

    const currentData = await getWeatherData("current", cityName)
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData("forecast", cityName)
    renderForecastWeather(forecastData)
}

const positionCallback = async position => {
    const currentData = await getWeatherData("current", position.coords)
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData("forecast", position.coords)
    renderForecastWeather(forecastData)
}

const errorCalback = error => {
    showModal(error.message);
}

const locationHandler = () => {
    if (navigator) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCalback)
    } else {
        showModal("you browser dose not support location");
    }

}

const initHandler = async () => {
    const currentData = await getWeatherData("current", "tehran")
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData("forecast", "tehran")
    renderForecastWeather(forecastData)
}

loacationIcon.addEventListener('click', locationHandler)
searchButton.addEventListener("click", searchHandler)
modalButton.addEventListener("click", removeModal) 
document.addEventListener("DOMContentLoaded", initHandler)