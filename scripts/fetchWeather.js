const API_KEY = "6696c79e8a8d1c412209a68814af3154";

const fetchFlags = (id) => {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data =>{
        flag_emojis = data.map(x => x.flag);
        console.log(flag_emojis);
    })
}


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
    // console.log(name, icon, description, temp, humidity, speed, feels_like, pressure);
    document.querySelector("#city").innerText = "Weather in " + name;
    document.querySelector("#temperature").innerText = Math.floor(temp) + "℃";
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
}

fetchWeater("Bacau");