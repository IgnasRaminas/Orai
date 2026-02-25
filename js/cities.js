
import { fetchPlaces } from "./api.js";

const container = document.getElementById("cities");

init();

async function init() {
    const places = await fetchPlaces();


    const counties = {};

    places.forEach(place => {
        const county = place.county || place.county_name || place.countyName || place.admin1 || place.region || place.municipality || 'Kita';
        const mun = place.municipality || place.municipality_name || place.municipalityName || '—';

        if (!counties[county]) counties[county] = {};
        if (!counties[county][mun]) counties[county][mun] = [];
        counties[county][mun].push(place);
    });

 
    Object.keys(counties).sort().forEach(countyName => {
        const countySection = document.createElement('section');
        countySection.className = 'county card';

        const h2 = document.createElement('h2');
        h2.textContent = countyName;
        countySection.appendChild(h2);

        Object.keys(counties[countyName]).sort().forEach(mun => {
            const munDiv = document.createElement('div');
            const h3 = document.createElement('h3');
            h3.textContent = mun;
            munDiv.appendChild(h3);

            counties[countyName][mun]
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(city => {
                    const p = document.createElement('p');
                    p.textContent = city.name;
                    p.style.cursor = 'pointer';
                    p.onclick = () => window.location.href = `city.html?city=${city.code}`;
                    munDiv.appendChild(p);
                });

            countySection.appendChild(munDiv);
        });

        container.appendChild(countySection);
    });
}
