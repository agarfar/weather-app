var weatherAPIKey = '02fcb568ae3ec5424d95745e3714ca7b';
var searchInput = document.querySelector('#search-input');
var searchButton = document.querySelector('.btn');
var searchHistoryEl = document.querySelector('.search-list');
var cityNameEl = document.querySelector('.city-name');
var currentTempEl = document.querySelector('.current-temp');
var currentWindEl = document.querySelector('.current-wind');
var currentHumidtyEl = document.querySelector('.current-humidity');
var forecastEl = document.querySelector('.forecast-cards')
var forecastElHeader = document.querySelector('.forecast')
var currentWeatherEl = document.querySelector('.current-weather')

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

var getSearchHistory = function (cityInput) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory')) ?? [];
    // console.log('This is getSearchHistorys searchHistory')
    // console.log(searchHistory)
    if (cityInput) {
        searchHistory.indexOf(cityInput) === -1 ?
            searchHistory.push(cityInput) : console.log("This item already exists");

        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        // console.log('This is getSearchHistorys searchHistory after push');
        // console.log(searchHistory);

    }
    // else{
    //     console.log('No input yet')
    // }
}

var generateSearchHistory = function () {
    getSearchHistory();
    var template = '';
    if (searchHistory) {
        for (i = 0; i < searchHistory.length; i++) {
            template += `<li>${searchHistory[i]}</li>`
        }
    }
    searchHistoryEl.innerHTML = template;
}

var getCityCurrent = function (city) {
    var cityCurrent = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + weatherAPIKey
    fetch(cityCurrent)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                return response.json();
            }
        })
        .then(function (data) {
            console.log('Grabbed Current Data Successfully')
            console.log(data.list);
            // sanDiego = data.list;
            // console.log(data.list.length);


            currentTemp = data.main.temp;
            currentWind = data.wind.speed;
            currentHumidity = data.main.humidity;
            currentIcon = data.weather[0].icon;
            cityName = data.name;
            currentDate = moment(data.dt, 'X').format('(MM/DD/YYYY)')

            // console.log('This is current date ' + currentDate);
            console.log('This is current temp ' + currentTemp);
            console.log('This is current wind ' + currentWind);
            console.log('This is current humidity ' + currentHumidity);
            console.log('This is current icon ' + currentIcon);
            console.log('This is current date ' + currentDate);

            var template3 = '';

            template3 += `

                <h3 class="city-name">${cityName + ' ' + currentDate}</h3>
                <h5 class="current-temp  pb-2">${'Temp: ' + currentTemp + '\u00B0F'}</h5>
                <h5 class="current-wind  pb-2">${'Wind: ' + currentWind + ' MPH'}</h5>
                <h5 class="current-humidity ">${'Humidity: ' + currentHumidity + '%'}</h5>
            `

            // cityNameEl.innerHTML = cityName + ' ' + currentDate;
            // currentTempEl.innerHTML = 'Temp: ' + currentTemp + '\u00B0F';
            // currentWindEl.innerHTML = 'Wind: ' + currentWind + ' MPH';
            // currentHumidtyEl.innerHTML = 'Humidity: ' + currentHumidity + '%';
            currentWeatherEl.innerHTML = template3;
            currentWeatherEl.classList.add('current-weather-active')
        })

};

var getCityForecast = function (city) {
    var cityData = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + weatherAPIKey
    fetch(cityData)
        .then(function (response) {
            if (response.ok) {
                // console.log(response)
                return response.json();
            }
        })
        .then(function (data) {
            console.log('Grabbed Forecast Data Successfully')
            console.log(data.list);
            // sanDiego = data.list;
            // console.log(data.list.length);
            for (i = 3; i < data.list.length; i += 8) {
                // console.log(data.list[i].dt_txt)
                forecastDate.push(data.list[i].dt);
                forecastTemp.push(data.list[i].main.temp);
                forecastWind.push(data.list[i].wind.speed);
                forecastHumidity.push(data.list[i].main.humidity);
                forecastIcon.push(data.list[i].weather[0].icon);
            }
            var template2 = '';
            for (i = 0; i < 5; i++) {
                template2 += ` 
                <div class="custom-card card me-3" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="mb-4 values">${moment(forecastDate[i], 'X').format('MM/DD/YYYY')}</h3>
                            <h6 class="card-title values forecast-temp pb-2">${'Temp: ' + forecastTemp[i] + '\u00B0F'}</h5>
                            <h6 class="card-title values forecast-wind pb-2">${'Wind: ' + forecastWind[i] + ' MPH'}</h5>
                            <h6 class="card-title values forecast-humidity">${'Humidity: ' + forecastHumidity[i] + '%'}</h5>
                        </div>
                    </div>
                `
            }
            forecastEl.innerHTML = template2;
            forecastElHeader.innerHTML = '<h3>5-Day Forecast</h3>'
            forecastDate = [];
            forecastTemp = [];
            forecastWind = [];
            forecastHumidity = [];
            forecastIcon = [];
        })

};

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (searchInput.value) {
        getCityCurrent(searchInput.value);
        getCityForecast(searchInput.value);
        getSearchHistory(searchInput.value)
        console.log('This is the searchHistory');
        console.log(searchHistory);
        generateSearchHistory();
    }
})

searchHistoryEl.addEventListener('click', function (event) {
    if (event.target.matches("li")) {
        getCityCurrent(event.target.innerText);
        forecastEl.innerHTML = '';
        getCityForecast(event.target.innerText);
        getSearchHistory(event.target.innerText);
        generateSearchHistory();
    }

})

generateSearchHistory();
