var weatherAPIKey = '02fcb568ae3ec5424d95745e3714ca7b'
var searchInput = document.querySelector('#search-input')
var searchButton = document.querySelector('.button')
// var sanDiego;


// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

/* <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li> */

// fetch("api.openweathermap.org/data/2.5/forecast?q=San Diego&appid=02fcb568ae3ec5424d95745e3714ca7b", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


// fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log('Github Repo Issues \n----------');
//         for (var i = 0; i < data.length; i++) {
//             console.log(data[i].url);
//             console.log(data[i].user.login);
//         }
//     });


var getCityData = function (city) {
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
                console.log(data.list[i].dt_txt)
            }
        })

};
 

searchButton.addEventListener('click',function(){
    getCityData(searchInput.value);
})

// var getCityData = function (city) {
//     var cityData = 'http://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid='+weatherAPIKey
//     fetch(cityData)
//         .then(function (response) {
//             if (response.ok) {
//                 console.log(response);
//                 response.json().then(function (data) {
//                     console.log(data);
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to connect to API');
//         });
// };

// getCityData('San Diego');