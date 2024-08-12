const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "7ecbcfc5912359e54c3c1271a7f8ff42"

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");


const getCurrentWeatherByName = async city => {
    const url =`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    console.log(url);
    const response = await fetch(url)
    const json = await response.json();
    return json;
}

const searchHandler = async () => {
    const cityName = searchInput.value;
    if (!cityName) {
        alert("Please select a city");
    }
    const currentData = await getCurrentWeatherByName(cityName)
    console.log(currentData);
    
}
searchButton.addEventListener("click", searchHandler)