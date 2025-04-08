import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from "/public/searchIcon.svg";
import SearchArrow from "/public/searchArrow.svg";

const SearchBar = ({ searchText, onSearchChange, onSearch }) => {
    const [showRecent, setShowRecent] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(searches.slice(0, 5));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setShowRecent(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addToRecentSearches = (city) => {
        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const updatedSearches = [
            city,
            ...searches.filter(s => s !== city)
        ];
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        setRecentSearches(updatedSearches.slice(0, 5));
    };

    const handleSearch = (city) => {
        onSearch(city);
        addToRecentSearches(city);
        onSearchChange(city);
        setShowRecent(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText) {
            handleSearch(searchText);
        }
    }

    return (
        <div className="relative" ref={searchBarRef}>
            <div className="bg-white w-96 h-12 rounded-full flex items-center justify-between mt-10 text-black">
                <input 
                    value={searchText} 
                    onChange={(e) => onSearchChange(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowRecent(true)}
                    className="pl-6 w-full focus:outline-0" 
                    type="text" 
                    placeholder="Search ..."
                />
                <div className="bg-[#0034AD] mr-2 w-10 h-9 rounded-full flex items-center justify-center">
                    <img 
                        onClick={() => searchText && handleSearch(searchText)} 
                        src={SearchIcon} 
                        alt="Search" 
                        className="cursor-pointer w-5 h-5" 
                    />
                </div>
                
            </div>

            {showRecent && recentSearches.length > 0 && (
                <div className="absolute w-full mt-2 bg-white text-black rounded-xl shadow-lg py-2 z-50">
                    {recentSearches.map((city, index) => (
                        <div
                            key={index}
                            className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSearch(city)}
                        >
                            <img src={SearchArrow} alt="Search" className="inline-block mr-2 w-4 h-4" />
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar