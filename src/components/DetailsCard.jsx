import React from 'react'
import Drops from "/public/Drops.svg"
import Sun from "/public/Sun.svg"
import TempCold from "/public/tempCold.svg"
import TempHeat from "/public/tempHeat.svg"
import Wind from "/public/wind.svg"
import Tornado from "/public/tornado.svg"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DetailsCard = ({data, unit}) => {
  const getTemperature = (temp_c, temp_f) => {
    return unit === 'fahrenheit' ? `${temp_f}°F` : `${temp_c}°C`;
  }

  const renderSkeletonCard = () => (
    <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
        <div className="flex self-start items-center justify-center gap-2">
            <Skeleton width={40} height={40} />
            <Skeleton width={80} />
        </div>
        <Skeleton width={100} height={36} />
    </div>
  )

  if (!data) {
    return (
      <div className="w-full">
          <div className="flex flex-row items-center justify-start gap-4 flex-nowrap mt-3 p-2 overflow-x-auto scrollbar">
              {[1,2,3,4,5,6].map((_, index) => (
                  <React.Fragment key={index}>
                      {renderSkeletonCard()}
                  </React.Fragment>
              ))}
          </div>
      </div>
    )
  }

  return (
    <div className="w-full">
        <div className="flex flex-row items-center justify-start gap-4 flex-nowrap mt-3 p-2 overflow-x-auto scrollbar">
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={Drops} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Humidity</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">{data?.current?.humidity}%</h1>
            </div>
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={Wind} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Wind</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">{data?.current?.wind_kph} Km/hr</h1>
            </div>
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={Sun} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Ultraviolet</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">{data?.current?.uv}</h1>
            </div>
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={Tornado} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Pressure</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">{data?.current?.pressure_in}</h1>
            </div>
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={TempHeat} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Heat Index</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">
                    {getTemperature(data?.current?.heatindex_c, data?.current?.heatindex_f)}
                </h1>
            </div>
            <div className="bg-white shadow-md min-w-[240px] md:w-60 h-32 rounded-xl p-4 flex flex-col items-center justify-between card">
                <div className="flex self-start items-center justify-center gap-2">
                <img src={TempCold} alt="Humidity" className="w-10 h-10" />
                <h1 className="text-black">Dew Point</h1>
                </div>
                <h1 className="text-black text-3xl font-medium text-center">
                    {getTemperature(data?.current?.dewpoint_c, data?.current?.dewpoint_f)}
                </h1>
            </div>
        </div>
    </div>
  )
}

export default DetailsCard