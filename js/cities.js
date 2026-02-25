
import { fetchPlaces } from "./api.js";

const container = document.getElementById("cities");

init();

async function init() {
    const places = await fetchPlaces();
    const municipalities = {};

    // Group by municipality (savivaldybė)
    places.forEach(place => {
        const mun = place.municipality || place.municipality_name || place.municipalityName || place.admin2 || 'Kita';
        if (!municipalities[mun]) municipalities[mun] = [];
        municipalities[mun].push(place);
    });

    // Render each municipality as a card with its cities
    Object.keys(municipalities).sort().forEach(mun => {
        const section = document.createElement('section');
        section.className = 'municipality card';

        const h2 = document.createElement('h2');
        h2.textContent = `${mun} (${municipalities[mun].length})`;
        section.appendChild(h2);

        municipalities[mun]
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(city => {
                const p = document.createElement('p');
                p.textContent = city.name;
                p.style.cursor = 'pointer';
                p.onclick = () => window.location.href = `city.html?city=${city.code}`;
                section.appendChild(p);
            });

        container.appendChild(section);
    });
}
