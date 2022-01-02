import "./style.css"
import {getWeatherData} from "./fetch";
import {generateMain} from "./main";
import faviconData from "./favicon.svg";

let weatherData;

async function generatePage() {
    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", faviconData);
    document.head.appendChild(favicon);


    const header = document.createElement("div");
    const headerBox1 = document.createElement("div");
    const headerTitle = document.createElement("h1");
    const headerBox2 = document.createElement("div");
    const headerSearchInput = document.createElement("input");
    const headerSearchButton = document.createElement("button");
    const headerBox3 = document.createElement("div");
    const headerUnitButton = document.createElement("button");
    const footer = document.createElement("div");
    const footerBox1 = document.createElement("div");
    const footerDeveloper = document.createElement("p");
    const footerOpenWeather = document.createElement("p");




    header.className = "header";
    headerTitle.className = "headerTitle";
    headerBox1.className = "headerBox";
    headerBox2.className = "headerBox";
    headerBox3.className = "headerBox";
    headerSearchInput.className="headerSearchInput";
    headerSearchButton.className="headerSearchButton";
    headerUnitButton.className="headerUnitButton";
    footer.className = "footer";
    footerBox1.className = "footerBox1";
    footerDeveloper.className = "footerDeveloper";
    footerOpenWeather.className = "footerOpenWeather";




    headerTitle.textContent = "Weather API";
    headerSearchButton.textContent = "Search";
    headerUnitButton.textContent = "Celcius / Fahrenheit";
    footerDeveloper.textContent = "Developed by topihenrik";
    footerOpenWeather.textContent = "Data from OpenWeather & Geoapify"


    headerBox1.appendChild(headerTitle);
    headerBox2.appendChild(headerSearchInput);
    headerBox2.appendChild(headerSearchButton);
    headerBox3.appendChild(headerUnitButton);
    header.appendChild(headerBox1);
    header.appendChild(headerBox2);
    header.appendChild(headerBox3);
    footerBox1.appendChild(footerDeveloper);
    footerBox1.appendChild(footerOpenWeather);
    footer.appendChild(footerBox1);
    
    
    let defaultCity = "Helsinki";
    document.body.appendChild(header);
    weatherData = await getWeatherData(defaultCity);
    const main = generateMain(weatherData, "celcius");
    document.body.appendChild(main);
    document.body.appendChild(footer);


    return main;
}


(async function(){
    let unit = "celcius";
    let main = await generatePage();
    const footer = document.querySelector(".footer");
    const headerSearchButton = document.querySelector(".headerSearchButton");
    headerSearchButton.addEventListener("click", async function(){
        const headerSearchInput = document.querySelector(".headerSearchInput");
        let city = headerSearchInput.value;
        weatherData = await getWeatherData(city);
        if (weatherData == -1) {
            console.log("Error: Bad input!");
            return;
        }
        main.remove(); 
        main = generateMain(weatherData, unit);
        document.body.insertBefore(main, footer);
    });

    const headerSearchInput = document.querySelector(".headerSearchInput");
    headerSearchInput.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            headerSearchButton.click();
        }
    })

    const headerUnitButton = document.querySelector(".headerUnitButton");
    headerUnitButton.addEventListener("click", function(){
        if (unit == "celcius") {
            unit = "fahrenheit";
            main.remove(); 
            main = generateMain(weatherData, unit);
            document.body.insertBefore(main, footer);
        } else {
            unit = "celcius";
            main.remove(); 
            main = generateMain(weatherData, unit);
            document.body.insertBefore(main, footer);
        }
    });
})();

