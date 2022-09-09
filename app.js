/*const iconElement = document.querySelector(".weather-icon")
const locationIcon  = document.querySelector(".location-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".loaction p")
const notificationElement=document.querySelector(".notification")

var input=document.getElementById("search")
let city=""
let latitude= 0.0
let longitude=0.0

input.addEventListener("keyup", function(event){
    if(event.KeyCode ===13)
    {
        event.preventDefault();
        city=input.value
        getSearchWeather(city)
        console.log(city)

    }
})
const weather ={}
weather.temperature ={
    unit: "Celsius"

}
const KELVIN=273

const key ='b168007ced66f4eba3876c46d526d199'
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)

}
else{
    notificationElement.style.display ='block'
    notificationElement.innerHTML= '<p>Browser doesnt support geolocation</p> '
}


function setPosition(position) {
    latitude= position.coords.latitude
    longitude=position.coords.longitude

    getWeather(latitude,longitude)
}
locationIcon.addEventListener("click",function(event){
    console.log('hey')
    getWeather(latitude,longitude)
})

function showError(error)
{
    notificationElement.style.display="block"
    notificationElement.innerHTML= `<p> ${error.message}</p>`
}

function getSearchWeather(city){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
   .then(function(response){
    let data= response.json()
    return data
})
.then(function(data){
    weather.temperature.value=Math.floor(data.main.temp - KELVIN)
    weather.description=data.weather[0].description
    weather.iconId= data.weather[0] .icon
    weather.city=data.name
    weather.country= data.sys.country
})
 .then(function(){
    displayWeather()
 })
 
}
function getWeather(latitude,longitude){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&appid=${key}`)
   .then(function(response){
    let data= response.json()
    return data

})
.then(function(data){
    weather.temperature.value=Math.floor(data.main.temp - KELVIN)
    weather.description=data.weather[0].description
    weather.iconId= data.weather[0] .icon
    weather.city=data.name
    weather.country= data.sys.country
})
 .then(function(){
    displayWeather()
 })
 
}
function displayWeather(){


    iconElement.innerHTML=`< img src="icon/${weather.iconId}.png"/>`
     tempElement.innerHTML=`${weather.value} *<span>C</span>`
     descElement.innerHTML=weather.description
     locationElement.innerHTML=`${weather.city}, ${weather.country}`
}*/
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const locationIcon  = document.querySelector(".location-icon")


var input=document.getElementById("search")
let city=""
let latitude= 0.0
let longitude=0.0

input.addEventListener('keydown', function(event){
    if(event.keycode ==13)
    {
        event.preventDefault();
        city=input.value
        getSearchWeather(city)
        console.log(city)

    }
})

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "b168007ced66f4eba3876c46d526d199";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;

}
function getSearchWeather(city){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icon/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}
locationIcon.addEventListener("click",function(event){
    console.log('hey')
    getWeather(latitude,longitude)
})

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

