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
        for(var i = 0; i < 5; ++i){
          var minTemp = data.list[i].main.temp_min.toFixed(1);
          var maxTemp = data.list[i].main.temp_max.toFixed(1);
          if(minTemp.charAt(minTemp.length - 1) === '0')
            minTemp = Math.floor(minTemp);
          if(maxTemp.charAt(maxTemp.length - 1) === '0')
            maxTemp = Math.floor(maxTemp);
          document.querySelector("#day" + (i+1).toString() + "Min").innerHTML = "Min: " + minTemp + "℃";
          document.querySelector("#day" + (i+1).toString() + "Max").innerHTML = "Max: " + maxTemp + "℃";
        }


      // Display the filtered forecast data
      console.log(fiveDayForecast);
    });
};