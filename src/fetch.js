async function getWeatherData(city = "Helsinki") {
    try {
        const GeoapifyAPIkey = "1008607df2b2451086439c9934fad5f4";
        const geolocationUrl = `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${GeoapifyAPIkey}`;
        console.log("geolocationUrl: " + geolocationUrl);
        const geolocationResponse = await fetch(geolocationUrl, {mode: 'cors'});
        const geolocation = await geolocationResponse.json();
        if (geolocation.results.length == 0) {
            return -1;
        }

        const OpenWeatherAPIkey = "c1ed134e99c187b86fd13acbd27f8fcf";
        const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${geolocation.results[0].lat}&lon=${geolocation.results[0].lon}&exclude=minutely,alerts&appid=${OpenWeatherAPIkey}`;
        console.log("oneCallUrl: " + oneCallUrl);
        const oneCallResponse = await fetch(oneCallUrl, {mode: 'cors'});
        const oneCall = await oneCallResponse.json();

        let data = {locationData: geolocation, weatherData: oneCall};
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {getWeatherData};