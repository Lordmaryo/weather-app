document.addEventListener("DOMContentLoaded", ()=> {
    const apiKey = "f754b0deb7b740e3387380c70b96760a";
    const weatherData = document.querySelector(".weather-data");
    const form = document.querySelector("form");
    const cityInput = document.querySelector("#city");

    form.addEventListener("submit", (event)=> {
        event.preventDefault()
        const cityValue = cityInput.value;
        if (cityValue.length === 0) {
            return;
        }

        getWeatherData(cityValue);
    })

    async function getWeatherData(cityValue) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
                );
            if (!response.ok) {
                throw new Error("Network response was bad!");
            }

            const data = await response.json()
            const temperature = Math.round(data.main.temp);
            const icon = data.weather[0].icon;
            const description = data.weather[0].description;
            const details = [
                `Feels like: ${Math.round(data.main.feels_like)}`,
                `Humidity: ${data.main.humidity} %`,
                `Wind speed: ${data.wind.speed} m/s`
            ];

            document.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" 
            alt="weather icon">`;
            document.querySelector(".temperature").innerHTML = `${temperature}°C`
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".details").innerHTML = details.map(detail=> `<div>${detail}</div>`).join("");
        } catch (error) {
            document.querySelector(".icon").innerHTML = '';
            document.querySelector(".temperature").innerHTML = '';
            document.querySelector(".description").innerHTML = '';
            document.querySelector(".details").innerHTML = 'Input error or try again later!';
        }
    }
});
