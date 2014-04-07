var coords = {};
var apiKey = 'AIzaSyBmDtiknyJcb82gZqBPz3cHZzxeZId7PX4';

function httpGet(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function getCityName (coords) {
    var urlToGetCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
        coords.latitude + ',' + coords.longitude + '&sensor=false&key=' + apiKey;

    var response = httpGet(urlToGetCity);
    var resultsArray = response && response.results && response.results.length && response.results[0].address_components;
    if (resultsArray && resultsArray.length) {
        for (var i = 0; i < resultsArray.length; i++) {
            if (resultsArray[i].types.indexOf('locality') === 0 &&
                resultsArray[i].types.indexOf('political') === 1 ) {
                console.log(' Your city is: ' + resultsArray[i].long_name);
            };
        };
    } else {
        console.log('nothing to show =(');
    };
}

navigator.geolocation.getCurrentPosition(function (location) {
    coords.latitude = location.coords.latitude;
    coords.longitude = location.coords.longitude;
    getCityName(coords);
});
