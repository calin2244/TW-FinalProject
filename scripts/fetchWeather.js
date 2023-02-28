const API_KEY = "API_KEY";

let flagEmojis = [];
let countryCode = [];

let cityExists = true;

const loadingDiv = document.querySelector("#loading-div");

const fetchFlagsAndCountryCode = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data =>{
        flagEmojis = data.map(x => x.flag);
        countryCode = data.map(x => x.cca2);
    })
}

fetchFlagsAndCountryCode();

const fetchWeatherJSON = async (city) =>{
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + city
    + "&units=metric&appid="
    + API_KEY
    );
    const data = await response.json();
    return data;
}

const fetchWeather = (city) => {
    fetchWeatherJSON(city)
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        cityExists = false;
        document.querySelector("#city").style.visibility = "hidden";
        document.querySelector("#temperature").innerText = "";
        document.querySelector("#icon").src = "";
        document.querySelector("#weather-description").innerText = "City/Country doesn't exist. We are currently loading nothing 😐";
        document.querySelector("#weather-description").style.textTransform = "uppercase";        
        document.querySelector("#weather-description").style.textDecoration = "none";        
        document.querySelector("#humidity").innerText = "❌";
        document.querySelector("#pressure").innerText = "❌";
        document.querySelector("#feels-like").innerText = "❌";
        document.querySelector("#wind").innerText = "";

        //fiveDayForecast
        for(let i = 0; i < 5; ++i){
            document.querySelector("#weekDay" + (i+1)).textContent = "";
            document.querySelector("#weekImg" + (i+1)).src = "";
            document.querySelector("#day" + (i+1) + "Min").textContent = "";
            document.querySelector("#day" + (i+1) + "Max").textContent = "";
        }

        document.querySelector("#weekDay3").textContent = "Please provide a valid input.";
    
    });
}

const displayWeather = (data) => {

    const { name } = data;
    const { icon, description } = data.weather[0];
    let { temp, humidity, pressure, feels_like } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    // console.log(checkBox.checked);

    let index = 0;

    for(let i = 0; i < countryCode.length; i++){
        if(countryCode[i] === country){
            //console.log("AM GASIT: ", country);
            break;
        }
        else{
            index = index + 1;
        }
    }

    let currentFlag = typeof flagEmojis[index] === "undefined" ? "" : flagEmojis[index];
    if(name === "Italy")
        currentFlag = "🇮🇹";

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

    cityExists = true;

    // <div class="row cf">
    //     <div class="span">
    //         <div class="help"></div>
    //     </div>
    // </div>
    
    const divSpanChild = document.createElement("div");
    divSpanChild.className = "span";
    const helpLoadingAnimation = document.createElement("div");
    helpLoadingAnimation.classList = "help";
    divSpanChild.append(helpLoadingAnimation);

    loadingDiv.append(divSpanChild);

    // console.log(name, icon, description, temp, humidity, speed, feels_like, pressure);
    document.querySelector("#city").style.visibility = "visible";
    document.querySelector("#city").innerText = currentFlag + "Weather in " + articol + name + currentFlag;
    document.querySelector("#temperature").innerText = Math.floor(temp) + tempSymbol;
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#weather-description").style.textTransform = "none";        
    document.querySelector("#weather-description").style.textDecoration = "underline";        
    document.querySelector("#weather-description").innerText = "How is it outside: " + description.toUpperCase();
    document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector("#pressure").innerText = "Pressure: " + pressure + " atm";
    document.querySelector("#feels-like").innerText = "Feels like: " + Math.ceil(feels_like) + tempSymbol;
    document.querySelector("#wind").innerText = "Wind speed: " + speed + "km/h" + "🌬️";
    
    divSpanChild.remove();
}

const searchButton = () => {
    fetchWeather(document.querySelector("#country-input").value);
    getForecast(inputElement.value);
    fetchLatAndLong(inputElement.value);
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
