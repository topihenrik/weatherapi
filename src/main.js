function unitConversion(temperature, unit) {
    let result = 0;
    if (unit == "celcius") {
        result = Math.round((temperature-273.15)) + "°C";
    } else if (unit == "fahrenheit") {
        result = Math.round((temperature*(9/5)-459.67)) + "°F";

        
    }
    return result;
}

function generateMain(weatherData, unit) {
    let unitFormat;
    if (unit == "celcius") {
        unitFormat = "-273.15";
    } else if (unit == "fahrenheit") {
        unitFormat = "*(9/5)-459.67";
    }
    const main = document.createElement("div");

    // mainCurrentWeather
    const mainCurrentWeather = document.createElement("div");
    const mainCurrentWeatherBox1 = document.createElement("div");
    const mainCurrentWeatherTime = document.createElement("div");
    const mainCurrentWeatherPlace = document.createElement("div");
    const mainCurrentWeatherType = document.createElement("div");
    const mainCurrentWeatherTemperature = document.createElement("div");
    const mainCurrentWeatherBox2 = document.createElement("div");
    const mainCurrentWeatherWindspeed = document.createElement("div");
    const mainCurrentWeatherHumidity = document.createElement("div");
    const mainCurrentWeatherFeelslike = document.createElement("div");
    const mainCurrenWeatherDewpoint = document.createElement("div");

    main.className = "main";
    mainCurrentWeather.className = "mainCurrentWeather";
    mainCurrentWeatherBox1.className = "mainCurrentWeatherBox";
    mainCurrentWeatherTime.className = "mainCurrentWeatherTime";
    mainCurrentWeatherPlace.className = "mainCurrentWeatherPlace";
    mainCurrentWeatherTemperature.className = "mainCurrentWeatherTemperature";
    mainCurrentWeatherBox2.className = "mainCurrentWeatherBox";
    mainCurrentWeatherWindspeed.className = "mainCurrentWeatherWindspeed";
    mainCurrentWeatherHumidity.className = "mainCurrentWeatherHumidity";
    mainCurrentWeatherFeelslike.className = "mainCurrentWeatherFeelslike";
    mainCurrenWeatherDewpoint.className = "mainCurrenWeatherDewpoint";


    const monthAbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augt", "Sept", "Oct", "Nov", "Dec"];
    const time = new Date();
    time.setSeconds(time.getSeconds() + weatherData.weatherData.timezone_offset);
    mainCurrentWeatherTime.textContent = monthAbr[time.getUTCMonth()] + " " + time.getUTCDate() + ", " + time.getUTCHours() + ":" + (time.getUTCMinutes()<10?"0":"") + time.getUTCMinutes();
    mainCurrentWeatherPlace.textContent = weatherData.locationData.results[0].city + ", " + weatherData.locationData.results[0].country;
    mainCurrentWeatherType.textContent = weatherData.weatherData.current.weather[0].main;
    mainCurrentWeatherTemperature.textContent = unitConversion(weatherData.weatherData.current.temp, unit);
    mainCurrentWeatherWindspeed.textContent = "Windspeed: " +  weatherData.weatherData.current.wind_speed + "m/s";
    mainCurrentWeatherHumidity.textContent = "Humidity: " + weatherData.weatherData.current.humidity + "%";
    mainCurrentWeatherFeelslike.textContent = "Feels Like: " + unitConversion(weatherData.weatherData.current.feels_like, unit);
    mainCurrenWeatherDewpoint.textContent = "Dew Point: " + unitConversion(weatherData.weatherData.current.dew_point, unit);



    mainCurrentWeather.appendChild(mainCurrentWeatherBox1);
    mainCurrentWeatherBox1.appendChild(mainCurrentWeatherTime);
    mainCurrentWeatherBox1.appendChild(mainCurrentWeatherPlace);
    mainCurrentWeatherBox1.appendChild(mainCurrentWeatherType);
    mainCurrentWeatherBox1.appendChild(mainCurrentWeatherTemperature);

    mainCurrentWeatherBox2.appendChild(mainCurrentWeatherWindspeed);
    mainCurrentWeatherBox2.appendChild(mainCurrentWeatherHumidity);
    mainCurrentWeatherBox2.appendChild(mainCurrentWeatherFeelslike);
    mainCurrentWeatherBox2.appendChild(mainCurrenWeatherDewpoint);
    mainCurrentWeather.appendChild(mainCurrentWeatherBox2);



    //mainDailyWeather
    const mainDailyWeather = document.createElement("div");
    const mainDailyWeatherContent = document.createElement("div");
    const mainDailyWeatherTitle = document.createElement("div");
    mainDailyWeather.className = "mainDailyWeather";
    mainDailyWeatherContent.className = "mainDailyWeatherContent";
    mainDailyWeatherTitle.className = "mainDailyWeatherTitle";

    mainDailyWeatherTitle.textContent = "Daily";
    mainDailyWeather.appendChild(mainDailyWeatherTitle);
    
    

    let dayAbr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i=0;i<7;i++) {
        const mainDailyWeatherDayBox = document.createElement("div");
        const mainDailyWeatherWeekDay = document.createElement("div");
        const mainDailyWeatherTemperatureMax = document.createElement("div");
        const mainDailyWeatherTemperatureMin = document.createElement("div");
        const mainDailyWeatherType = document.createElement("div");


        mainDailyWeatherDayBox.className = "mainDailyWeatherDayBox";
        mainDailyWeatherWeekDay.className = "mainDailyWeatherWeekDay";
        mainDailyWeatherTemperatureMax.className = "mainDailyWeatherTemperatureMax";
        mainDailyWeatherTemperatureMin.className = "mainDailyWeatherTemperatureMin";
        mainDailyWeatherType.className = "mainDailyWeatherType";


        
        mainDailyWeatherWeekDay.textContent = dayAbr[new Date(weatherData.weatherData.daily[i].dt * 1000).getDay()];
        mainDailyWeatherTemperatureMax.textContent = unitConversion(weatherData.weatherData.daily[i].temp.max, unit);
        mainDailyWeatherTemperatureMin.textContent = unitConversion(weatherData.weatherData.daily[i].temp.min, unit);
        mainDailyWeatherType.textContent = weatherData.weatherData.daily[i].weather[0].main;


        mainDailyWeatherDayBox.appendChild(mainDailyWeatherWeekDay);
        mainDailyWeatherDayBox.appendChild(mainDailyWeatherTemperatureMax);
        mainDailyWeatherDayBox.appendChild(mainDailyWeatherTemperatureMin);
        mainDailyWeatherDayBox.appendChild(mainDailyWeatherType);
        
        mainDailyWeatherContent.appendChild(mainDailyWeatherDayBox);


    }

    mainDailyWeather.appendChild(mainDailyWeatherContent);



    //mainHourlyWeather
    const mainHourlyWeather = document.createElement("div");
    const mainHourlyWeatherContent = document.createElement("div");
    const mainHourlyWeatherTitle = document.createElement("div");
    mainHourlyWeather.className = "mainHourlyWeather";
    mainHourlyWeatherContent.className = "mainHourlyWeatherContent";
    mainHourlyWeatherTitle.className = "mainHourlyWeatherTitle";

    mainHourlyWeatherTitle.textContent = "Hourly";
    mainHourlyWeather.appendChild(mainHourlyWeatherTitle);
    

    for (let i = 0;i<=24;i+=4) {
        const mainHourlyWeatherHourBox = document.createElement("div");
        const mainHourlyWeatherTime = document.createElement("div");
        const mainHourlyWeatherTemperature = document.createElement("div");
        const mainHourlyWeatherType = document.createElement("div");

        mainHourlyWeatherHourBox.className = "mainHourlyWeatherHourBox";
        mainHourlyWeatherTime.className = "mainHourlyWeatherTime";
        mainHourlyWeatherTemperature.className = "mainHourlyWeatherTemperature";
        mainHourlyWeatherType.className = "mainHourlyWeatherType";

        mainHourlyWeatherTime.textContent = new Date(weatherData.weatherData.hourly[i].dt*1000+weatherData.weatherData.timezone_offset*1000).getHours() + ":00";
        mainHourlyWeatherTemperature.textContent = unitConversion(weatherData.weatherData.hourly[i].temp, unit);
        mainHourlyWeatherType.textContent = weatherData.weatherData.hourly[i].weather[0].main;

        mainHourlyWeatherHourBox.appendChild(mainHourlyWeatherTime);
        mainHourlyWeatherHourBox.appendChild(mainHourlyWeatherTemperature);
        mainHourlyWeatherHourBox.appendChild(mainHourlyWeatherType);


        mainHourlyWeatherContent.appendChild(mainHourlyWeatherHourBox);
    }
    
    mainHourlyWeather.appendChild(mainHourlyWeatherContent);


    main.appendChild(mainCurrentWeather);
    main.appendChild(mainDailyWeather);
    main.appendChild(mainHourlyWeather);
    return main;
}

export{generateMain};