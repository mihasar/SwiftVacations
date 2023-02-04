import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Vacations" element={<VacationsList />} />
            <Route path="/add" element={<AddVacation />} />
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default Routing;