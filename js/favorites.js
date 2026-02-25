
import { getFavorites, removeFavorite } from "./storage.js";
import { fetchForecast } from "./api.js";

const container = document.getElementById("favorites");

init();

async function init() {
    const favorites = getFavorites();

    for (let city of favorites) {
        const data = await fetchForecast(city);
        const div = document.createElement("div");
        div.innerHTML = `<h3>${city}</h3>
            <button>Šalinti</button>`;

        div.querySelector("button").onclick = () => {
            removeFavorite(city);
            location.reload();
        };

        container.appendChild(div);
    }
}
