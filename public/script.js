function GetCityTweets(paramsObject) {
    var coords = {};
    var apiKey = 'AIzaSyBmDtiknyJcb82gZqBPz3cHZzxeZId7PX4';

    function httpGet(url){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText);
    }

    function getCityName(coords) {
        var urlToGetCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
            coords.latitude + ',' + coords.longitude + '&sensor=false&key=' + apiKey;

        var response = httpGet(urlToGetCity);
        var resultsArray = response &&
            response.results &&
            response.results.length &&
            response.results[0].address_components;
        if (resultsArray && resultsArray.length) {
            for (var i = 0; i < resultsArray.length; i++) {
                if (resultsArray[i].types.indexOf('locality') === 0 &&
                    resultsArray[i].types.indexOf('political') === 1 ) {
                    return resultsArray[i].long_name;
                }
            }
        } else {
            return "";
        }
    }


    var cb = new Codebird;
    cb.setConsumerKey("yFvW9jsrYefI3BMJfQysHN5o5", "Cf9fKkMQB9mVe292WdmDwkIkbennfDXDpjdTijzp7pIPx1rOkc");

    navigator.geolocation.getCurrentPosition(function (location) {
        coords.latitude = location.coords.latitude;
        coords.longitude = location.coords.longitude;
        var cityName = getCityName(coords);
        cb.__call(
            "search_tweets",
            "q=%23" + cityName,
            function (reply) {
                var response = reply.statuses.map(function(value, index){
                    return {
                        'post_created_at': (new Date(value.created_at)).toDateString(),
                        'text': value.text,
                        'user_name': value.user && value.user.name,
                        'profile_image_url': value.user && value.user.profile_image_url,
                    }
                });
                document.querySelector(paramsObject.selectorToInsert).innerHTML = tmpl(paramsObject.templateSelector, {data: response});
            },
            true // this parameter required
        );
    });
}