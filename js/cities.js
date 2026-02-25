
import { fetchPlaces } from "./api.js";

const container = document.getElementById("cities");

init();

async function init() {
    const places = await fetchPlaces();
    const municipalities = {};

    places.forEach(place => {
        if (!municipalities[place.municipality]) {
            municipalities[place.municipality] = [];
        }
        municipalities[place.municipality].push(place);
    });

    Object.keys(municipalities).sort().forEach(mun => {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${mun}</h3>`;

        municipalities[mun]
            .sort((a,b)=>a.name.localeCompare(b.name))
            .forEach(city => {
                const p = document.createElement("p");
                p.textContent = city.name;
                p.onclick = () =>
                    window.location.href = `city.html?city=${city.code}`;
                section.appendChild(p);
            });

        container.appendChild(section);
    });
}
