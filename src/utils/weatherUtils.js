export const fetchWeatherData = async (location) => {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=bdb504e98ef54d49a1760256242412&q=${location}`);
    const data = await res.json();
    localStorage.setItem('weatherData', JSON.stringify(data));
    return data;
}
