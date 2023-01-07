const MAPS_API_KEY = "AIzaSyAVucAHadzWSJ6v-cco1D3InVezkjqhbCI";

let currentLat;
let currentLong;
const timeElement = document.querySelector("#time");
timeElement.textContent = "";

const fetchLatAndLong = (input) => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" 
    + input  
    + "&key="
    + MAPS_API_KEY)
    .then(response => response.json())
    .then(data =>{
        //timeElement.textContent = "Fetching local time...";
        timeElement.textContent = "";
        timeElement.style.color = "white";
        const location = data.results[0];
        currentLat = location.geometry.location.lat;
        currentLong = location.geometry.location.lng;
        console.log(currentLat, currentLong);
        getTime(currentLat, currentLong);
    })
    .catch(error =>{
        timeElement.textContent = "Couldn't fetch TIME for " + input + ".";
        timeElement.style.color = "rgb(205, 74, 74)";
    }
    );
}

const getTime = (latitude, longitude) =>{
    
    const divSpanChild = document.createElement("div");
    divSpanChild.className = "span";
    const helpLoadingAnimation = document.createElement("div");
    helpLoadingAnimation.classList = "help";
    divSpanChild.append(helpLoadingAnimation);
    timeElement.append(divSpanChild);
    
    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude.toFixed(2)},${longitude.toFixed(2)}&timestamp=${Date.now() / 1000}&key=${MAPS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const rawOffset = data.rawOffset;
        const dstOffset = data.dstOffset;
        const totalOffset = rawOffset + dstOffset;

        const currentTime = new Date();
        const localTime = new Date(currentTime.getTime() + totalOffset  * 1000);

        const hours = localTime.getHours() - 2 < 0 ? (24 - localTime.getHours()).toString() : (localTime.getHours() - 2).toString();
        const minutes = localTime.getMinutes() < 10 ? "0" + localTime.getMinutes().toString() : localTime.getMinutes().toString();

        const timeString = "🕒" + hours +  ":" + minutes + "🕒";

        if(cityExists){
            divSpanChild.remove();
            timeElement.textContent = timeString;
        }
    });
}

if(timeElement.textContent != "")
    searchButton.addEventListener("click", fetchLatAndLong(inputElement.value));

// searchButton.addEventListener("click", fetchLatAndLong(inputElement.value));
