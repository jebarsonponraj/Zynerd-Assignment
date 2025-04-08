import { Link } from "react-router-dom";
import SettingIcon from "/public/settingsIcon.svg";

const Greetings = () => {
    return (
        <div className="flex flex-col mt-7 md:max-w-1/2 px-4 md:px-0">
            <div>
                <h1 className="font-bold text-2xl md:text-[32px]">Good Morning, Sheldon Cooper</h1>
                <p className="font-medium text-lg md:text-xl">Check out today's weather information</p>
                
                <Link to="/settings">
                    <div className="bg-white w-10 h-10 rounded-full cursor-pointer flex items-center justify-center fixed md:absolute right-4 top-4 md:right-10 md:top-10 z-10">
                        <img src={SettingIcon} alt="Settings" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Greetings