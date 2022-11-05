var weatherAPIKey = '02fcb568ae3ec5424d95745e3714ca7b';
var searchInput = document.querySelector('#search-input');
var searchButton = document.querySelector('.btn');
var searchHistoryEl = document.querySelector('.search-list')

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
    console.log('This is getSearchHistorys searchHistory')
    console.log(searchHistory)
    if (cityInput) {
        searchHistory.push(cityInput);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log('This is getSearchHistorys searchHistory after push');
        console.log(searchHistory);

    }
    else{
        console.log('No input yet')
    }

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

    // searchHistory = [];
    // getSearchHistory();
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
            console.log('Grabbed Data Successfully')
            // console.log(data.list);
            // sanDiego = data.list;
            // console.log(data.list.length);

            currentTemp = data.main.temp;
            currentWind = data.wind.speed;
            currentHumidity = data.main.humidity;
            currentIcon = data.weather[0].icon;
            cityName = data.name;
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
            // console.log('should see this message')
            // console.log(data.list);
            // sanDiego = data.list;
            // console.log(data.list.length);
            for (i = 3; i < data.list.length; i += 8) {
                // console.log(data.list[i].dt_txt)
                forecastDate.push(data.list[i].dt_txt);
                forecastTemp.push(data.list[i].main.temp);
                forecastWind.push(data.list[i].wind.speed);
                forecastHumidity.push(data.list[i].main.humidity);
                forecastIcon.push(data.list[i].weather[0].icon);
            }
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


// getCityForecast('San Diego');
// console.log(forecastDate);
// console.log(forecastTemp);
// console.log(forecastWind);
// console.log(forecastHumidity);
// console.log(forecastIcon);
// // getCityCurrent('San Diego');
// // console.log('This is current date ' + currentDate);
// console.log('This is current temp ' + currentTemp);
// console.log('This is current wind ' + currentWind);
// console.log('This is current humidity ' + currentHumidity);
// console.log('This is current icon ' + currentIcon);

generateSearchHistory();
