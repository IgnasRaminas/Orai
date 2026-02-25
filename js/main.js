
import { fetchForecast } from "./api.js";

const cities = ["vilnius", "kaunas", "klaipeda"];
const container = document.getElementById("forecast");

init();

async function init() {
    for (let city of cities) {
        const data = await fetchForecast(city);
        renderShortForecast(city, data.forecastTimestamps);
    }
}

function renderShortForecast(city, forecasts) {
    const filtered = forecasts.filter(f =>
        f.forecastTimeUtc.includes("00:00:00") ||
        f.forecastTimeUtc.includes("12:00:00")
    ).slice(0, 6);

    const div = document.createElement("div");
    div.innerHTML = `<h3>${city.toUpperCase()}</h3>` +
        filtered.map(f => `<p>${f.forecastTimeUtc} - ${f.airTemperature}°C</p>`).join("");

    div.onclick = () => window.location.href = `city.html?city=${city}`;

    container.appendChild(div);
}
