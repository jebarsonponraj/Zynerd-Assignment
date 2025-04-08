import moment from "moment";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LocationIcon from "/public/locationIcon.svg"
import TemperatureIcon from "/public/temperatureIcon.svg"
import DetailsCard from "./DetailsCard";

const WeatherCard = ({data, unit}) => {
    const date =  moment().format("dddd Do MMMM"); 
    const time = moment().format("hh:mm A");

    const getTemperature = (temp_c, temp_f) => {
        return unit === 'fahrenheit' ? `${temp_f}°F` : `${temp_c}°C`;
    }

    if (!data) {
        return (
            <div className="bg-white w-[90%] md:w-1/2 rounded-xl flex flex-col items-start justify-between mt-10 p-3">
                <div className="bg-[#0034AD] w-full h-auto rounded-xl flex flex-col md:flex-row items-start justify-between p-3 weather-card gap-4">
                    <div className="flex flex-col items-start justify-between gap-4">
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex items-center gap-1">
                                <Skeleton width={20} height={20} />
                                <Skeleton width={100} />
                            </div>
                            <Skeleton width={150} />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <Skeleton width={120} height={48} />
                            <div className="flex items-center gap-1">
                                <Skeleton width={20} height={20} />
                                <Skeleton width={100} />
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center">
                            <Skeleton width={80} />
                            <Skeleton width={150} height={32} />
                        </div>
                    </div>
                    <div className="text-center self-end md:self-start">
                        <Skeleton width={80} />
                        <Skeleton width={120} />
                    </div>
                </div>
                <Skeleton width={250} className="mt-3" />
                <DetailsCard data={data} unit={unit} />
            </div>
        )
    }

    return (
        <div className="bg-white w-[90%] md:w-1/2 rounded-xl flex flex-col items-start justify-between mt-10 p-3">
            <div className="bg-[#0034AD] w-full h-auto rounded-xl flex flex-col md:flex-row items-start justify-between p-3 weather-card gap-4">
                <div className="flex flex-col items-start justify-between gap-4">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center gap-1">
                            <img src={LocationIcon} alt="Location" className="w-3 h-3" />
                            <h1 className="">{data?.location?.name}</h1>
                        </div>
                        <p className="text-sm">{data?.location?.region}, {data?.location?.country}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="text-5xl font-bold">
                            {getTemperature(data?.current?.temp_c, data?.current?.temp_f)}
                        </h1>
                        <div className="flex items-center gap-1">
                            <img src={TemperatureIcon} alt="Temperature" className="w-3 h-3" />
                            <p>Feels like {getTemperature(data?.current?.feelslike_c, data?.current?.feelslike_f)}</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-start justify-center">
                        <p className="text-xs">Weather Forecast</p>
                        <h1 className="text-2xl font-bold">{data?.current?.condition?.text}</h1>
                    </div>
                </div>
                <div className="text-center self-end md:self-start">
                    <h1>{time}</h1>
                    <p>{date}</p>
                </div>
            </div>
            <h1 className="text-black font-medium mt-3">More details on today's weather</h1>
            <DetailsCard data={data} unit={unit} />
        </div>
    )
}

export default WeatherCard