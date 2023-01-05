// const MAPS_API_KEY = "AIzaSyAVucAHadzWSJ6v-cco1D3InVezkjqhbCI";

// let currentLat;
// let currentLong;
// const timeElement = document.querySelector("#time");
// timeElement.textContent = "";

// const fetchLatAndLong = (input) => {
//     fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" 
//     + input  
//     + "&key="
//     + MAPS_API_KEY)
//     .then(response => response.json())
//     .then(data =>{
//         timeElement.textContent = "Fetching local time...";
//         const location = data.results[0];
//         currentLat = location.geometry.location.lat;
//         currentLong = location.geometry.location.lng;
//         console.log(currentLat, currentLong);
//         getTime(currentLat, currentLong);
//     });
// }

// const getTime = (latitude, longitude) =>{
    
//     fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude.toFixed(2)},${longitude.toFixed(2)}&timestamp=${Date.now() / 1000}&key=${MAPS_API_KEY}`)
//     .then(response => response.json())
//     .then(data => {
//         const rawOffset = data.rawOffset;
//         const dstOffset = data.dstOffset;
//         const totalOffset = rawOffset + dstOffset;

//         const currentTime = new Date();
//         const localTime = new Date(currentTime.getTime() + totalOffset  * 1000);

//         const hours = localTime.getHours() - 2 < 0 ? (24 - localTime.getHours()).toString() : (localTime.getHours() - 2).toString();
//         const minutes = localTime.getMinutes() < 10 ? "0" + localTime.getMinutes().toString() : localTime.getMinutes().toString();

//         const timeString = "🕒" + hours +  ":" + minutes + "🕒";
//         timeElement.textContent = timeString;

//         console.log(timeString);
//     });
// }

// if(timeElement.textContent != "")
//     searchButton.addEventListener("click", fetchLatAndLong(inputElement.value));

// // searchButton.addEventListener("click", fetchLatAndLong(inputElement.value));
