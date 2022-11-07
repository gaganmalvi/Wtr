// Copyright (C) 2022 Gagan Malvi
// SPDX-License-Identifier: Apache-2.0

const api = {
    key: "cd3c097765ba92903ec783b6cf5bef86",
    base: "https://api.openweathermap.org"
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function getTemperature() {
    document.querySelector('.weatherup').style.display = "none";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetch(`${api.base}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
             .then(weather => weather.json()).then((output) => {
                document.querySelector('.weatherup').style.display = "flex";
                console.log(output);
                document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${output.weather[0].icon}@2x.png`;
                document.querySelector('.temp').innerText = `${output.main.temp}`;
                document.querySelector('.city').innerText = `${output.name}, ${output.sys.country}`;
                document.querySelector('.desc').innerText = `${output.weather[0].main}`;
                document.querySelector('.wind').innerText = `${output.wind.speed} km/h`;
                document.querySelector('.hum').innerText = `${output.main.humidity}%`;
                document.querySelector('.pres').innerText = `${output.main.pressure} hPa`;
                document.querySelector('.min').innerText = `${output.main.temp_min} C`;
                document.querySelector('.max').innerText = `${output.main.temp_max} C`;
                if (output.visibility > 1000) {
                    document.querySelector('.vis').innerText = `${output.visibility/1000} km`;
                } else {
                    document.querySelector('.vis').innerText = `${output.visibility} m`;
                }
                document.querySelector('.sunrise').innerText = `${timeConverter(output.sys.sunrise)}`;
                document.querySelector('.sunset').innerText = `${timeConverter(output.sys.sunset)}`;
            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getAirPollution() {
    document.querySelector('.airquality').style.display = "none";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetch(`${api.base}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&APPID=${api.key}`)
             .then(weather => weather.json()).then((output) => {
                document.querySelector('.airquality').style.display = "flex";
                console.log(output);
                document.querySelector('.aqi').innerText = `${output.list[0].main.aqi}`;
                document.querySelector('.pm2_5').innerText = `${output.list[0].components.pm2_5}`;
                document.querySelector('.pm10').innerText = `${output.list[0].components.pm10}`;
                document.querySelector('.no2').innerText = `${output.list[0].components.no2}`;
                document.querySelector('.so2').innerText = `${output.list[0].components.so2}`;
                document.querySelector('.co').innerText = `${output.list[0].components.co}`;
                document.querySelector('.o3').innerText = `${output.list[0].components.o3}`;
                document.querySelector('.aq-date').innerText = `Pulled at: ${timeConverter(output.list[0].dt)}`;
            });
            fetch(`${api.base}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
             .then(weather => weather.json()).then((output) => {
                document.querySelector('.aq-city').innerText = `${output.name}, ${output.sys.country}`;
             });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeatherByCity() {
    let city = document.getElementById('citydata').value;
    document.querySelector('.weatherup').style.display = "none";
    fetch(`${api.base}/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`)
             .then(weather => weather.json()).then((output) => {
                document.querySelector('.weatherup').style.display = "flex";
                console.log(output);
                document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${output.weather[0].icon}@2x.png`;
                document.querySelector('.temp').innerText = `${output.main.temp}`;
                document.querySelector('.city').innerText = `${output.name}, ${output.sys.country}`;
                document.querySelector('.desc').innerText = `${output.weather[0].main}`;
                document.querySelector('.wind').innerText = `${output.wind.speed} km/h`;
                document.querySelector('.hum').innerText = `${output.main.humidity}%`;
                document.querySelector('.pres').innerText = `${output.main.pressure} hPa`;
                document.querySelector('.min').innerText = `${output.main.temp_min} C`;
                document.querySelector('.max').innerText = `${output.main.temp_max} C`;
                if (output.visibility > 1000) {
                    document.querySelector('.vis').innerText = `${output.visibility/1000} km`;
                } else {
                    document.querySelector('.vis').innerText = `${output.visibility} m`;
                }
                document.querySelector('.sunrise').innerText = `${timeConverter(output.sys.sunrise)}`;
                document.querySelector('.sunset').innerText = `${timeConverter(output.sys.sunset)}`;
            })
            .catch(err => {
                alert("Wrong city name!")
                document.getElementById('citydata').value = "";
            });
}