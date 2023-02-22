import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/adminVacationsService";
import notify from "../../../Utils/Notify";
import "./VacationsReports.css";


function VacationsReports(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        adminVacationsService.getAllReportsForAdmin()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, [vacations]);


    const tryoutData = [
        {
            likes: vacations.map(v => v.vacationId),
            vacation: users.map(u => u.id),
        }
    ]

    // const data = [
    //     {
    //         likes: 4,
    //         vacation: 'Paris, France',
    //     },
    //     {
    //         likes: 3,
    //         vacation: 'Cancun, Mexico',
    //     },
    //     {
    //         likes: 2,
    //         vacation: 'Sydney, Australia',
    //     },
    //     {
    //         likes: 2,
    //         vacation: 'Roma, Italy',
    //     },
    //     {
    //         likes: 1,
    //         vacation: 'Santorini, Greece',
    //     },
    //     {
    //         likes: 2,
    //         vacation: 'Tokyo, Japan',
    //     },
    //     {
    //         likes: 3,
    //         vacation: 'Varadero, Cuba',
    //     },
    //     {
    //         likes: 2,
    //         vacation: 'New York City, USA',
    //     },
    //     {
    //         likes: 1,
    //         vacation: 'Toronto, Canada',
    //     },
    //     {
    //         likes: 1,
    //         vacation: 'Munich, Germany',
    //     },
    //     {
    //         likes: 3,
    //         vacation: 'Zurich, Switzerland',
    //     },
    //     {
    //         likes: 2,
    //         vacation: 'Prague, Czech Republic',
    //     },
    //     {
    //         likes: 1,
    //         vacation: 'Los Angeles, USA',
    //     },
    //     {
    //         likes: 0,
    //         vacation: 'Reykjavík, Iceland',
    //     },
    //     {
    //         likes: 3,
    //         vacation: 'London, UK',

    //     },
    // ];

    return (

        <div className="VacationsReports">
            <h2>Reports Graph <button className="CSVBtn"><CSVLink data={tryoutData}><DownloadIcon fontSize="medium" sx={{ color: "green" }} /></CSVLink></button></h2>

            <BarChart
                className="BarCharts"
                width={1400}
                height={575}
                data={tryoutData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vacation" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" stackId="a" fill="lightgreen" />
            </BarChart>

        </div>
    )

}

export default VacationsReports;


