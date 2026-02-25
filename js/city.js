
import { fetchForecast } from "./api.js";
import { addFavorite, isFavorite } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const container = document.getElementById("city");
const favBtn = document.getElementById("favBtn");

init();

async function init() {
    const data = await fetchForecast(city);
    data.forecastTimestamps.forEach(f => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${f.forecastTimeUtc} - ${f.airTemperature}°C</p>`;
        container.appendChild(div);
    });

    if (isFavorite(city)) {
        favBtn.textContent = "Jau pasirinkta";
    }

    favBtn.onclick = () => {
        addFavorite(city);
        alert("Pridėta!");
    };
}
