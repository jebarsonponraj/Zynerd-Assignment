import { Link, useNavigate } from "react-router-dom"
import BackArrow from "/public/backArrow.svg"
import { useState, useEffect } from "react"
import SearchArrow from "/public/searchArrow.svg"
import TrashIcon from "/public/trashCan.svg"

const Settings = () => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('tempUnit') || 'celsius'
  })

  const [searchHistory, setSearchHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
 
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
    setSearchHistory(searches)
  }, [])

  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit)
    localStorage.setItem('tempUnit', selectedUnit)
  }

  const handleCityClick = async (city) => {
    localStorage.setItem('lastSelectedCity', city);
    navigate('/')
  }

  const handleDeleteCity = (cityToDelete) => {
    const updatedHistory = searchHistory.filter(city => city !== cityToDelete)
    localStorage.setItem('recentSearches', JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory)
  }

  return (
    <div className="flex w-full items-center justify-center md:justify-end h-auto p-2 md:p-5">
      <div className="bg-white w-[95%] md:w-1/2 m-2 md:m-5 z-10 py-10 relative rounded-xl flex flex-col items-center justify-start">
        <Link to="/">
          <div className="absolute top-5 left-5 cursor-pointer bg-[#F0F0F0] p-2 rounded-full">
            <img src={BackArrow} className="w-4 h-4" alt="Back"/>
          </div>
        </Link>

        <h1 className="text-2xl font-bold text-black mt-16">Temperature unit</h1>
        
        <div className="bg-[#F0F0F0] w-[90%] md:w-1/2 h-14 rounded-full flex items-center justify-between mt-10 text-black overflow-hidden p-1">
          <div 
            onClick={() => handleUnitChange('celsius')}
            className={`w-1/2 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 mx-1 ${
              unit === 'celsius' ? 'bg-[#0034AD] shadow-sm' : ''
            }`}>
            <span className={`font-medium ${unit === 'celsius' ? 'text-white' : 'text-gray-600'}`}>
              Celsius
            </span>
          </div>
          <div 
            onClick={() => handleUnitChange('fahrenheit')}
            className={`w-1/2 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 mx-1 ${
              unit === 'fahrenheit' ? 'bg-[#0034AD] shadow-sm' : ''
            }`}>
            <span className={`font-medium ${unit === 'fahrenheit' ? 'text-white' : 'text-gray-600'}`}>
              Fahrenheit
            </span>
          </div>
        </div>

        <div className="w-full px-4 md:px-10 mt-10"> 
          <hr className="border-gray-200"/>
          <h2 className="text-xl text-center font-semibold text-black mt-6 mb-4">History</h2>
          
          <div className="overflow-y-auto max-h-[calc(100vh-450px)] pr-2">
            <div className="space-y-4">
              {searchHistory.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl">
                  <div 
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() => handleCityClick(city)}
                  >
                  <div className="bg-[#F0F0F0] w-10 h-10 rounded-md flex items-center justify-center">  
                    <img src={SearchArrow} alt="Search" className="w-5 h-5"/>
                    </div>
                    <span className="text-gray-700">{city}</span>
                  </div>
                  <img 
                    src={TrashIcon} 
                    alt="Delete" 
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleDeleteCity(city)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
