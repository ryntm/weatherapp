$(document).ready(function() {

    const apiKey = "ecbcada8aa60e9ad0b8e6939e25be7a0";
    const apiKeyUV = "";
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    var lastCity = JSON.parse(localStorage.getItem("last-city"))
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&units=imperial&APPID=" + apiKey
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity + "&units=imperial&APPID=" + apiKey
    // var urlUV = 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng;
    // US IS NOT LOADING ON BUTTON PRESS
    var lat = JSON.parse(localStorage.getItem("lat"));
    var lon = JSON.parse(localStorage.getItem("lon"));


    if (savedCities == null) {
        savedCities = [];
    };
    
    
    if (lastCity == null) {
        document.getElementById("weather-now").innerHTML = "<h3>Welcome!<br><br>Add cities to the left to see weather information!"
        // return false;
    } else {
        getWeather();

    }


    if (savedCities.length > 0) {
        for (var i = 0; i < savedCities.length; i++) {
            var addCity = document.createElement("button");
            var linebreak = document.createElement("br");
            var cityName = document.getElementById("city-name").value.trim();
            addCity.setAttribute("data-name", savedCities[i]);
            addCity.setAttribute("id", "city-button");
            addCity.innerHTML = savedCities[i];
            document.getElementById("city-list").appendChild(addCity);
            document.getElementById("city-list").appendChild(linebreak);
        }}
    
    
    // JSON.parse(localStorage.getItem("cities"));
    // console.log(savedCities);
    
    function appendCity() {
        var addCity = document.createElement("button");
        var linebreak = document.createElement("br");
        var cityName = document.getElementById("city-name").value.trim();
        addCity.setAttribute("data-name", cityName);
        addCity.setAttribute("id", "city-button");
        addCity.innerHTML = cityName;
        document.getElementById("city-list").appendChild(addCity);
        document.getElementById("city-list").appendChild(linebreak);
        savedCities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(savedCities));
        document.getElementById("city-name").value = "";
    }

    document.getElementById("add-city").addEventListener("click", function() {
        if  (document.getElementById("city-name").value.length === 0) {
            alert("Please enter a city name.");
        } else {
            var cityName = document.getElementById("city-name").value.trim();
            localStorage.setItem("last-city", JSON.stringify(cityName));
            appendCity();
            location.reload();


        }})

    document.getElementById("city-name").addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && document.getElementById("city-name").value.length === 0) {
            alert("Please enter a city name.");
        } else if (e.key === 'Enter') {
            var cityName = document.getElementById("city-name").value.trim();
            localStorage.setItem("last-city", JSON.stringify(cityName));
            appendCity();
            location.reload();

    }})


        function getWeather() {
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    console.log(json)

                    if (json.cod == "404") {
                        document.getElementById("weather-now").innerHTML = "The selected city is not valid. Please select another city."
                        $("#weather-5").empty();
                        return
                    }
                
                    var getCurrentWeather = document.createElement("h1");
                    var weatherImage = document.createElement("img")
                    var linebreak = document.createElement("br");
                    var pTemp = document.createElement("p");
                    var pFeelsLike = document.createElement("p");
                    var pHum = document.createElement("p");
                    var pWind = document.createElement("p");
                    var pUV = document.createElement("p");
                    var weatherNow = document.getElementById("weather-now");
                    var date = new Date();
                    var lat = json.coord.lat;
                    var lon = json.coord.lon;
                    localStorage.setItem("lat", JSON.stringify(lat));
                    localStorage.setItem("lon", JSON.stringify(lon));

                    console.log(lat)
                    console.log(lon)


                    weatherImage.setAttribute("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
                    getCurrentWeather.innerHTML = json.name + " (" + date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + ")" ;
                    weatherNow.appendChild(getCurrentWeather);
                    weatherNow.append(weatherImage);
                    pTemp.innerHTML = "Temperature: " + json.main.temp + " F"
                    pFeelsLike.innerHTML = "Feel Like: " + json.main.feels_like + " F"
                    pHum.innerHTML = "Humidity: " + json.main.humidity
                    pWind.innerHTML = "Wind: " + json.wind.speed
                    // pUV.innerHTML = " UV Index: " + json.
                    weatherNow.appendChild(pTemp);
                    weatherNow.appendChild(pFeelsLike);
                    weatherNow.appendChild(pHum);
                    weatherNow.appendChild(pWind);
                    // weatherNow.appendChild(pUV);
                                        
                        $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function(request) {
                            request.setRequestHeader('x-access-token', 'b2fdf0c2f5ca3cf3b1ab5bb6f3b67e33');
                        },
                        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lon,
                        success: function(r) {
                            //handle successful response
                            console.log(r)
                            pUV.innerHTML = " UV Index: " + r.result.uv
                            weatherNow.appendChild(pUV);
                        },
                        error: function(response) {
                            // handle error response    
                            pUV.innerHTML = " UV Index: Not Found"
                            weatherNow.appendChild(pUV);
                        }
                    })
                        

                })
                fetch(urlFiveDay)
                .then(function(r) {
                    return r.json();
                })
                .then(function(json) {
                    var forecastDay = json.list
                    var extractFive = [forecastDay[7],forecastDay[15],forecastDay[23],forecastDay[31],forecastDay[39]]
                    $("#weather-5").empty();

                    //i want to make a div for 4 values of i -- 
                    // for (var i = 0; i < forecastDay.length; i++) {
                    //     if (i !== 7 || i !== 15 || i !== 23 || i !== 31 || i !== 39) {
                            
                    //     } else {
                        for (var i = 0; i < extractFive.length; i++) {
                            var forecastDiv1 = document.createElement("div")
                            var forecastDate = document.createElement("h3")
                            var weatherImage = document.createElement("img")
                            var pTemp = document.createElement("p");
                            var pFeelsLike = document.createElement("p");
                            var date1 = new Date(extractFive[i].dt * 1000);
                            var weather5 = document.getElementById("weather-5");

                            forecastDiv1.setAttribute("id", "five-day-div");
                            forecastDiv1.setAttribute("class", "rounded");
                            forecastDate.innerHTML = "(" + date1.getMonth()+1 + "/" + date1.getDate() + "/" + date1.getFullYear() + ")";
                            weatherImage.setAttribute("src", "https://openweathermap.org/img/w/" + extractFive[i].weather[0].icon + ".png");
                            // document.getElementById("five-day-div").appendChild(forecastDate);
                            pTemp.innerHTML = "Temp: " + extractFive[i].main.temp + " F";
                            pFeelsLike.innerHTML = "Feels like: " + extractFive[i].main.feels_like + " F";
                            // document.getElementById("five-day-div").appendChild(pTemp);
                            // document.getElementById("five-day-div").appendChild(pFeelsLike);
                            forecastDiv1.appendChild(forecastDate);
                            forecastDiv1.appendChild(weatherImage);
                            forecastDiv1.appendChild(pTemp);
                            forecastDiv1.appendChild(pFeelsLike);
                            
                            weather5.appendChild(forecastDiv1);

                        }
                            
                        }
                        
                    )
            

            
            };


        var demo = document.querySelectorAll("#city-button");
        for (var i = 0; i < demo.length; i++) {
            demo[i].addEventListener("click", function() {
                // var url = "";
                var url = "https://api.openweathermap.org/data/2.5/weather?q=" + $(this).data("name") + "&units=imperial&APPID=" + apiKey;
                var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + $(this).data("name") + "&units=imperial&APPID=" + apiKey;
                var cityName = $(this).data("name");
                localStorage.setItem("last-city", JSON.stringify(cityName));

                $("#weather-now").empty();
                // getWeather();
                fetch(url)
                .then(function(response) {
                    return response.json();


                }) 
                .then(function(json) {

                    // getWeather();

                    if (json.cod == "404") {
                        document.getElementById("weather-now").innerHTML = "The selected city is not valid. Please select another city."
                        $("#weather-5").empty();

                        return
                    }

                    var getCurrentWeather = document.createElement("h1");
                    var weatherImage = document.createElement("img")
                    var linebreak = document.createElement("br");
                    var pTemp = document.createElement("p");
                    var pFeelsLike = document.createElement("p");
                    var pHum = document.createElement("p");
                    var pWind = document.createElement("p");
                    var pUV = document.createElement("p");
                    var weatherNow = document.getElementById("weather-now");
                    var date = new Date();
                    var lat = json.coord.lat;
                    var lon = json.coord.lon;
                    localStorage.setItem("lat", JSON.stringify(lat));
                    localStorage.setItem("lon", JSON.stringify(lon));

                    weatherImage.setAttribute("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
                    getCurrentWeather.innerHTML = json.name + " (" + date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + ")" ;
                    weatherNow.appendChild(getCurrentWeather);
                    weatherNow.append(weatherImage);
                    pTemp.innerHTML = "Temperature: " + json.main.temp + " F"
                    pFeelsLike.innerHTML = "Feel Like: " + json.main.feels_like + " F"
                    pHum.innerHTML = "Humidity: " + json.main.humidity
                    pWind.innerHTML = "Wind: " + json.wind.speed
                    // pUV.innerHTML = " UV Index: " + json.
                    weatherNow.appendChild(pTemp);
                    weatherNow.appendChild(pFeelsLike);
                    weatherNow.appendChild(pHum);
                    weatherNow.appendChild(pWind);
                    // weatherNow.appendChild(pUV);

                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function(request) {
                            request.setRequestHeader('x-access-token', 'b2fdf0c2f5ca3cf3b1ab5bb6f3b67e33');
                        },
                        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lon,
                        success: function(r) {
                            //handle successful response
                            console.log(r)
                            pUV.innerHTML = " UV Index: " + r.result.uv
                            weatherNow.appendChild(pUV);
                        },
                        error: function(response) {
                            // handle error response    
                            pUV.innerHTML = " UV Index: Not Found"
                            weatherNow.appendChild(pUV);
                        }
                    })

                    
                })
                fetch(urlFiveDay)
                .then(function(r) {
                    return r.json();
                })
                .then(function(json) {
                    var forecastDay = json.list
                    var extractFive = [forecastDay[7],forecastDay[15],forecastDay[23],forecastDay[31],forecastDay[39]]
                    $("#weather-5").empty();

                    //i want to make a div for 4 values of i -- 
                    // for (var i = 0; i < forecastDay.length; i++) {
                    //     if (i !== 7 || i !== 15 || i !== 23 || i !== 31 || i !== 39) {
                            
                    //     } else {
                        for (var i = 0; i < extractFive.length; i++) {
                            var forecastDiv1 = document.createElement("div")
                            var forecastDate = document.createElement("h3")
                            var weatherImage = document.createElement("img")
                            var pTemp = document.createElement("p");
                            var pFeelsLike = document.createElement("p");
                            var date1 = new Date(extractFive[i].dt * 1000);
                            var weather5 = document.getElementById("weather-5");

                            forecastDiv1.setAttribute("id", "five-day-div");
                            forecastDiv1.setAttribute("class", "rounded");
                            forecastDate.innerHTML = "(" + date1.getMonth()+1 + "/" + date1.getDate() + "/" + date1.getFullYear() + ")";
                            weatherImage.setAttribute("src", "https://openweathermap.org/img/w/" + extractFive[i].weather[0].icon + ".png");
                            // document.getElementById("five-day-div").appendChild(forecastDate);
                            pTemp.innerHTML = "Temp: " + extractFive[i].main.temp + " F";
                            pFeelsLike.innerHTML = "Feels like: " + extractFive[i].main.feels_like + " F";
                            // document.getElementById("five-day-div").appendChild(pTemp);
                            // document.getElementById("five-day-div").appendChild(pFeelsLike);
                            forecastDiv1.appendChild(forecastDate);
                            forecastDiv1.appendChild(weatherImage);
                            forecastDiv1.appendChild(pTemp);
                            forecastDiv1.appendChild(pFeelsLike);
                            
                            weather5.appendChild(forecastDiv1);

                        }
                            
                        }
                        
                    )

                });
            };
            // getWeather();

    // })};

// make a for loop based on the "cod" code. if its 200, show the data, if its 404 return and print that the city name is invalid. 


// on load, it would get the json file from localstorage and then create buttons for each entry. parse(localStorage.getItem(saved-cities))

    // var cityButton = document.querySelectorAll("#city-button");
    // console.log(cityButton[i])        
    // // for (var i = 0; i < cityButton.length; i++) 
    // cityButton.forEach(function(cityButton, index) {
    //     console.log(index); // index
    //     console.log(cityButton); });
        // document.getElementById("city-name").addEventListener("click", function() {
        // //     var cityButton2 = Array.from(document.querySelectorAll("#city-button"));
        // //     console.log(cityButton2);
        //     var url = "";
        //     var url = cityButton[i].getAttribute("data-name");
        //     console.log(url);
        //     var url = "http://api.openweathermap.org/data/2.5/weather?q=" + url + apiKey;
        //     console.log(url);
            
        // })});
        
        
        });
