export function roundNumber(num) {
    if (num) return Math.round(num);
    return 0;
}

export function songProgress(num1, num2) {
    const value = (num1 * 100) / num2;
    return value;
}

export function convertSecondstoTime(given_seconds) {
    if (!given_seconds) return '00:00';

    const hours = Math.floor(given_seconds / 3600);
    const minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    const seconds = given_seconds - (minutes * 60);

    const timeString = minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');
    return timeString;
}