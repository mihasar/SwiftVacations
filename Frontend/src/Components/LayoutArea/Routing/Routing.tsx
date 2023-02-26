import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationsReports from "../../VacationsArea/VacationsReports/VacationsReports";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (

        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vacations" element={<VacationsList />} />
            <Route path="/vacations/new" element={<AddVacation />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/reports" element={<VacationsReports />} />
            <Route path="/add" element={<AddVacation />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default Routing;
