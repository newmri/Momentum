const API_KEY = "f0a37cfda031ba20bdd4daa67174e715";
const COORDS_KEY = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
         ).then(function(response){
             return response.json()
         }).then(function(json){
             const temperature = json.main.temp;
             const place = json.name;
             weather.innerText = `${temperature} @ ${place}`;
         });
}

function saveCoords(coordsObj){
localStorage.setItem(COORDS_KEY, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){

}

function askForCoords(){
navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
const loadedCords = localStorage.getItem(COORDS_KEY);

if(null === loadedCords){
    askForCoords();
}
else{
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
}
}

function init(){
    loadCoords();
}

init();