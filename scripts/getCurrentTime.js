const MAPS_API_KEY = "AIzaSyAVucAHadzWSJ6v-cco1D3InVezkjqhbCI";

let currentLat;
let currentLong;

const fetchLatAndLong = (input) => {

    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" 
    + input  
    + "&key="
    + MAPS_API_KEY)
    .then(response => response.json())
    .then(data =>{
        const location = data.results[0];
        currentLat = location.geometry.location.lat;
        currentLong = location.geometry.location.lng;
        console.log(currentLat, currentLong);
        getTime(currentLat, currentLong);
    });
}

const getTime = (latitude, longitude) =>{
    
    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude.toFixed(2)},${longitude.toFixed(2)}&timestamp=${Date.now() / 1000}&key=${MAPS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const rawOffset = data.rawOffset;
        const dstOffset = data.dstOffset;
        const totalOffset = rawOffset + dstOffset;

        const currentTime = new Date();
        const localTime = new Date(currentTime.getTime() + totalOffset  * 1000);
        const timeString = "🕒" + (localTime.getHours() - 2).toString() +  ":" + localTime.getMinutes().toString() + "🕒";

        const timeElement = document.querySelector("#time");
        timeElement.textContent = timeString;

        console.log(timeString);
    });
}

timeElement.textContent = "";
document.querySelector("#search-button").addEventListener("click", fetchLatAndLong(inputElement.value));

//document.querySelector("#search-button").addEventListener("click", fetchLatAndLong);