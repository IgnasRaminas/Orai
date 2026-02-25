
const BASE_URL = "https://meteoapi.vercel.app/v1";

export async function fetchPlaces() {
    return fetchWithCache("places", `${BASE_URL}/places`);
}

export async function fetchForecast(city) {
    return fetchWithCache(
        `forecast-${city}`,
        `${BASE_URL}/places/${city}/forecasts/long-term`
    );
}

async function fetchWithCache(key, url) {
    const cached = localStorage.getItem(key);

    if (cached) {
        const parsed = JSON.parse(cached);
        const now = new Date().getTime();

        if (now - parsed.timestamp < 12 * 60 * 60 * 1000) {
            return parsed.data;
        }
    }

    const response = await fetch(url);
    const data = await response.json();

    localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: new Date().getTime()
    }));

    return data;
}
