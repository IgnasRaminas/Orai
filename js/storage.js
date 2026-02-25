
export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addFavorite(city) {
    const favorites = getFavorites();
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

export function removeFavorite(city) {
    const favorites = getFavorites().filter(c => c !== city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(city) {
    return getFavorites().includes(city);
}
