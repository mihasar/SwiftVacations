import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/adminVacationsService";
import notify from "../../../Utils/Notify";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import "./VacationsReports.css";

interface VacationData {
    destination: string;
    followerCount: number;
}

function Reports(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [following, setFollowing] = useState({

        label: vacations.map((v) => v.destination),
        datasets: [{
            label: "followers",
            data: vacations.map((v) => v.followersCount),
        }]

    })

    // Get all Reports for admin
    useEffect(() => {
        adminVacationsService.getAllReportsForAdmin()
            .then((dbVacation) => setVacations(dbVacation))
            .catch((err) => notify.error(err));
    }, []);

    // The headers i want to have in my excel file, when i download it via csv
    const data = [
        ["vacations", "likes"]
    ];

    for (let vacation of vacations) {
        let vacationsList: any = [];
        vacationsList.push(vacation.destination);
        vacationsList.push(vacation.followersCount);
        data.push(vacationsList);
    }

    const vacationData: VacationData[] = vacations.map((vacation) => {
        const { destination, followersCount } = vacation;
        return { destination, followerCount: followersCount };
    });

    return (
        <div className="VacationsReports">

            <h2>Vacations Report &nbsp;
                <CSVLink
                    data={data}
                    filename={"vacations.csv"}
                    className="CsvBtn"
                    target="_blank" >
                    <SimCardDownloadIcon />
                </CSVLink>
            </h2>
            
            <br />

            <BarChart width={1350} height={500} data={vacationData} className="BarCharts">
                <CartesianGrid strokeDasharray="33" />
                <XAxis dataKey="destination" className="chart" tick={{ fill: "#000000" }} />
                <YAxis />
                <Tooltip />
                <Legend className="chart" />
                <Bar dataKey="followerCount" fill="lightseagreen" />
            </BarChart>

        </div>
    );
}

export default Reports;