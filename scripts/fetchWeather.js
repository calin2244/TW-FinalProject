const API_KEY = "6696c79e8a8d1c412209a68814af3154";

let flagEmojis = [];
let countryCode = [];

const fetchFlagsAndCountryCode = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data =>{
        flagEmojis = data.map(x => x.flag);
        countryCode = data.map(x => x.cca2);
    })
}

fetchFlagsAndCountryCode();


const fetchWeather = (city) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + city
    + "&units=metric&appid="
    + API_KEY
    )
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    });
}

const displayWeather = (data) => {

    const {name} = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure, feels_like } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    var index = 0;
    for(let i = 0; i < countryCode.length; i++){
        if(countryCode[i] === country){
            console.log("AM GASIT: ", country);
            break;
        }
        else{
            index = index + 1
        }
    }

    const currentFlag = flagEmojis[index];

    // console.log(name, icon, description, temp, humidity, speed, feels_like, pressure);
    document.querySelector("#city").innerText = currentFlag + "Weather in " + name + currentFlag;
    document.querySelector("#temperature").innerText = Math.floor(temp) + "℃";
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#weather-description").innerText = "How is it outside: " + description.toUpperCase();
    document.querySelector("#humidity").innerText = "Humidity: " + humidity;
    document.querySelector("#pressure").innerText = "Pressure: " + pressure;
    document.querySelector("#feels-like").innerText = "Feels like: " + feels_like;
    document.querySelector("#wind").innerText = "Speed of wind: " + speed + "km/h" + "🌬️";
}

const searchButton = () => {
    fetchWeather(document.querySelector("#country-input").value);
}

document.querySelector("#search-button").addEventListener("click", searchButton);

// Get the input field
var inputField = document.querySelector("#country-input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("#search-button").click();

    }
}); 

fetchWeather("Bacau");