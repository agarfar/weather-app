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

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

/* <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li> */



var getSearchHistory = function (cityInput) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory')) ?? [];
    searchHistory.push(cityInput);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

}

var generateSearchHistory = function(){

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
            getSearchHistory(city);
        })

};

var getCityForecast = function (city) {
    var cityData = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + weatherAPIKey
    fetch(cityData)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                return response.json();
            }
        })
        .then(function (data) {
            // console.log('should see this message')
            console.log(data.list);
            // sanDiego = data.list;
            console.log(data.list.length);
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
    getCityCurrent(searchInput.value);
    getCityForecast(searchInput.value);

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