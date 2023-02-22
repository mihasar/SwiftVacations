import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import PageNotFound from "../PageNotFound/PageNotFound";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsReports from "../../VacationsArea/VacationsReports/VacationsReports";

function Routing(): JSX.Element {
    return (

        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Vacations" element={<VacationsList />} />
            <Route path="/Vacations/new" element={<AddVacation />} />
            <Route path="/Vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/Reports" element={<VacationsReports />} />
            <Route path="/add" element={<AddVacation />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default Routing;
