import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BuildingImage from "/public/building.svg";
import Settings from "./pages/Settings";

const App = () => {
    return (
        <BrowserRouter>
            <div className="w-full h-screen relative">
                <div className="flex flex-col items-center justify-start h-screen">
                    <img
                        src={BuildingImage}
                        alt="Building"
                        className="absolute -left-[29%] h-screen mt-20 object-cover"
                    />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
