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
    })
    .catch(console.error("Couldn't find city/country"));
}

const displayWeather = (data) => {

    const {name} = data;
    const { icon, description } = data.weather[0];
    let { temp, humidity, pressure, feels_like } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    // console.log(checkBox.checked);

    var index = 0;
    for(let i = 0; i < countryCode.length; i++){
        if(countryCode[i] === country){
            //console.log("AM GASIT: ", country);
            break;
        }
        else{
            index = index + 1;
        }
    }

    const currentFlag = flagEmojis[index];

    var element = document.querySelector("#city");
    element.style.color = null;

    let articol = name === "United States of America" ? "the " : "";

    let tempSymbol = "℃";
    //transformam temperatura in ferenheit
    if(checkBox.checked){
        temp = temp * 1.8 + 32;
        tempSymbol = "°F";
        feels_like = feels_like * 1.8 + 32;
    }


    // console.log(name, icon, description, temp, humidity, speed, feels_like, pressure);
    document.querySelector("#city").innerText = currentFlag + "Weather in " + articol + name + currentFlag;
    document.querySelector("#temperature").innerText = Math.floor(temp) + tempSymbol;
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#weather-description").innerText = "How is it outside: " + description.toUpperCase();
    document.querySelector("#humidity").innerText = "Humidity: " + humidity;
    document.querySelector("#pressure").innerText = "Pressure: " + pressure + " kPa";
    document.querySelector("#feels-like").innerText = "Feels like: " + Math.ceil(feels_like) + tempSymbol;
    document.querySelector("#wind").innerText = "Speed of wind: " + speed + "km/h" + "🌬️";
    
    //Loading
    document.querySelector(".weather").classList.remove("weather-fetching");
}

const searchButton = () => {
    fetchWeather(document.querySelector("#country-input").value);
}

document.querySelector("#search-button").addEventListener("click", searchButton);

const checkBox = document.querySelector("#checkbox");
checkBox.checked = false;
document.querySelector(".ferenheit").style.color = "white";

// console.log(checkBox.checked);

checkBox.addEventListener("click", function(){
    if(!checkBox.checked){
        document.querySelector(".ferenheit").style.color = "white";
        fetchWeather(inputElement.value);
    }
    else{
        document.querySelector(".ferenheit").style.color = "plum";
        fetchWeather(inputElement.value);
    }
});