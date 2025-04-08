import {useState, useEffect} from "react";
import Greetings from "./Greetings"
import WeatherCard from "./WeatherCard"
import SearchBar from "./SearchBar";
import { fetchWeatherData } from '../utils/weatherUtils'

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tempUnit, setTempUnit] = useState(() => {
        return localStorage.getItem('tempUnit') || 'celsius'
    });

    const handleSearch = async (location) => {
        setLoading(true);
        const data = await fetchWeatherData(location)
        setWeatherData(data)
        // Store the successfully searched location
        localStorage.setItem('lastSearchedCity', location);
        setLoading(false);
    }

    useEffect(() => {
        const lastSelectedCity = localStorage.getItem('lastSelectedCity');
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        const cityToSearch = lastSelectedCity || lastSearchedCity || "Chennai";
        
        handleSearch(cityToSearch);
        
        // Clear lastSelectedCity after using it (only if it exists)
        if (lastSelectedCity) {
            localStorage.removeItem('lastSelectedCity');
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setTempUnit(localStorage.getItem('tempUnit') || 'celsius');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="w-full h-screen relative flex flex-col items-center justify-start">
            <Greetings />
            <SearchBar 
                searchText={searchText}
                onSearchChange={setSearchText}
                onSearch={handleSearch}
            />
            <WeatherCard data={weatherData} unit={tempUnit} />
        </div>
    )
}

export default Home