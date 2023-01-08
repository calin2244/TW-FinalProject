const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday","Monday","Tuesday","Wednesday", "Thursday"];

//INITIALIZARI
const headerWords = ["Waiting", "for", "your", "input", "❗❗"]

for(let i = 0; i < 5; ++i){
  document.querySelector("#weekDay" + (i+1)).textContent = headerWords[i];
  document.querySelector("#weekImg" + (i+1)).src = "";
  document.querySelector("#day" + (i+1) + "Min").textContent = "";
  document.querySelector("#day" + (i+1) + "Max").style.paddingTop = "15px";
  document.querySelector("#day" + (i+1) + "Max").textContent = "";
  
  let loadingEl = document.createElement("div");
  loadingEl.style.paddingTop = "40px";
  loadingEl.style.fontFamily = "Josefin Sans";
  loadingEl.style.fontSize = "24px";
  loadingEl.style.width = "60px";
  loadingEl.className = "help";
  loadingEl.textContent = "your";

  if(i === 2){
    document.querySelector("#day" + (i+1) + "Max").appendChild(loadingEl);
    document.querySelector("#weekDay" + (i+1)).textContent = "";
  }

}

const getForecast = (city) => {
  console.log("merge:))");
  fetch("https://api.openweathermap.org/data/2.5/forecast?q="
  + city + 
  "&units=metric&appid="
  + API_KEY)
  .then(response => response.json())
    .then(data => {
      // 5 days forecast
        // const date = new Date(item.dt * 1000);
        // const currentDate = new Date();

        // return (
        //   date.getDay() === currentDate.getDay() &&
        //   date.getMonth() === currentDate.getMonth() &&
        //   date.getYear() === currentDate.getYear()

        // );

        const d = new Date();
        let currentDay = weekday[d.getDay()];

        for(let i = 0; i < 5; ++i){
          let minTemp = data.list[i].main.temp_min.toFixed(1);
          let maxTemp = data.list[i].main.temp_max.toFixed(1);
          if(minTemp.charAt(minTemp.length - 1) === '0')
            minTemp = Math.floor(minTemp);
          if(maxTemp.charAt(maxTemp.length - 1) === '0')
            maxTemp = Math.floor(maxTemp);
          
          const { icon } = data.list[i].weather[0];

          document.querySelector("#weekDay" + (i+1)).textContent = currentDay;
          currentDay = weekday[d.getDay() + i + 1];

          document.querySelector("#weekImg" + (i+1)).src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

          document.querySelector("#day" + (i+1) + "Min").textContent = "Min: " + minTemp + "℃";
          document.querySelector("#day" + (i+1) + "Max").textContent = "Max: " + maxTemp + "℃";
        }


      //Display data
      console.log(fiveDayForecast);
    });
};