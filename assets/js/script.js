var weatherAPIKey = "02fcb568ae3ec5424d95745e3714ca7b";
var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector(".btn");
var searchHistoryEl = document.querySelector(".search-list");
var cityNameEl = document.querySelector(".city-name");
var currentTempEl = document.querySelector(".current-temp");
var currentWindEl = document.querySelector(".current-wind");
var currentHumidtyEl = document.querySelector(".current-humidity");
var forecastEl = document.querySelector(".forecast-cards");
var forecastElHeader = document.querySelector(".forecast");
var currentWeatherEl = document.querySelector(".current-weather");

var cityName;
var currentDate;
var currentTemp;
var currentWind;
var currentHumidity;
var currentIcon;

var forecastDate = [];
var forecastTemp = [];
var forecastWind = [];
var forecastHumidity = [];
var forecastIcon = [];

var searchHistory;

// Takes city name as input, gets and sets search history to local storage
var getSearchHistory = function (cityInput) {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory")) ?? [];
    if (cityInput) {
        searchHistory.indexOf(cityInput) === -1
            ? searchHistory.push(cityInput)
            : console.log("This item already exists");

        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
};

// Generates search history from local storage and displays it on screen
var generateSearchHistory = function () {
    getSearchHistory();
    var template = "";
    if (searchHistory) {
        for (i = 0; i < searchHistory.length; i++) {
            template += `<li>${searchHistory[i]}</li>`;
        }
    }
    searchHistoryEl.innerHTML = template;
};

// Fetches current weather data and displays it on screen
var getCityCurrent = function (city) {
    var cityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherAPIKey;
    fetch(cityCurrent)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
        })
        .then(function (data) {
            console.log("Grabbed Current Data Successfully");
            console.log(data.list);
            currentTemp = data.main.temp;
            currentWind = data.wind.speed;
            currentHumidity = data.main.humidity;
            currentIcon = data.weather[0].icon;
            cityName = data.name;
            currentDate = moment(data.dt, "X").format("(MM/DD/YYYY)");
            console.log("This is current temp " + currentTemp);
            console.log("This is current wind " + currentWind);
            console.log("This is current humidity " + currentHumidity);
            console.log("This is current icon " + currentIcon);
            console.log("This is current date " + currentDate);

            var template3 = "";

            template3 += `
                <h3 class="city-name">${cityName + " " + currentDate} 
                <span><img src="https://openweathermap.org/img/w/${currentIcon}.png"></img></span></h3>
                <h5 class="current-temp  pb-2">${"Temp: " + currentTemp + "\u00B0F"
                }</h5>
                <h5 class="current-wind  pb-2">${"Wind: " + currentWind + " MPH"
                }</h5>
                <h5 class="current-humidity ">${"Humidity: " + currentHumidity + "%"
                }</h5>
            `;
            currentWeatherEl.innerHTML = template3;
            currentWeatherEl.classList.add("current-weather-active");
        });
};

// Fetches forecast data for the next 5 days and displays it on screen
var getCityForecast = function (city) {
    var cityData =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        weatherAPIKey;
    fetch(cityData)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log("Grabbed Forecast Data Successfully");
            console.log(data.list);
            for (i = 0; i < data.list.length; i++) {
                if (moment(data.list[i].dt_txt, 'YYYY-MM-DD HH:mm:ss').format("HH") === '00') {
                    forecastDate.push(data.list[i].dt_txt);
                    forecastTemp.push(data.list[i].main.temp);
                    forecastWind.push(data.list[i].wind.speed);
                    forecastHumidity.push(data.list[i].main.humidity);
                    forecastIcon.push(data.list[i].weather[0].icon);
                }
            }
            var template2 = "";
            for (i = 0; i < 5; i++) {
                template2 += ` 
                <div class="custom-card card me-3" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="values">${moment(forecastDate[i], "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY")}</h4>
                            <img class = "mb-4" src="https://openweathermap.org/img/w/${forecastIcon[i]}.png"></img>
                            <h6 class="card-title values forecast-temp pb-2">${"Temp: " + forecastTemp[i] + "\u00B0F"}</h5>
                            <h6 class="card-title values forecast-wind pb-2">${"Wind: " + forecastWind[i] + " MPH"}</h5>
                            <h6 class="card-title values forecast-humidity">${"Humidity: " + forecastHumidity[i] + "%"}</h5>
                        </div>
                    </div>
                `;
            }
            forecastEl.innerHTML = template2;
            forecastElHeader.innerHTML = "<h3 class='custom-h3'>5-Day Forecast</h3>";
            forecastDate = [];
            forecastTemp = [];
            forecastWind = [];
            forecastHumidity = [];
            forecastIcon = [];
        });
};

//Generate updated search history, as well as current and forecasted weather for a given city when clicking on search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (searchInput.value) {
        getCityCurrent(searchInput.value);
        getCityForecast(searchInput.value);
        getSearchHistory(searchInput.value);
        console.log("This is the searchHistory");
        console.log(searchHistory);
        generateSearchHistory();
    }
});

// Generate updated search history, as well as current and forecasted weather for a given city when clicking on a search history entry
searchHistoryEl.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        getCityCurrent(event.target.innerText);
        forecastEl.innerHTML = "";
        getCityForecast(event.target.innerText);
        getSearchHistory(event.target.innerText);
        generateSearchHistory();
    }
});

// Generate search history - if it exists - when the page is loaded
generateSearchHistory();
