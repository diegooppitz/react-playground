// manage local storage and clear after 24hours without changes
export function manageLocalStorage() {
    const hours = 24;
    const now = new Date().getTime();
    const setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now);
    } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
            localStorage.clear();
            localStorage.setItem('setupTime', now);
        }
    }
}

// check if have city on localStorage
export function checkHaveCity({ city, cities }) {
    if (!cities) return false;
    return cities.find((item) => item?.location?.lon === city?.location?.lon && item?.location?.lat === city?.location?.lat);
}

// redirect to a route
export function routerPush({ home, citySearch }) {
    window.location.href = home ? '/' : `/?city=${citySearch}`;
}