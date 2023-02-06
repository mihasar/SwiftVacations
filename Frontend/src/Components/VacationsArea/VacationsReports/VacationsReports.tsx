import { CSVLink } from "react-csv";
import "./VacationsReports.css";
import DownloadIcon from '@mui/icons-material/Download';


function VacationsReports(): JSX.Element {

    const csvData = [
        ["Vacation", "Followers"],
    ];

    return (

        <div className="VacationsReports">


            <h3>CSV:</h3>
            <CSVLink data={csvData}><DownloadIcon fontSize="large" /></CSVLink>
        </div>
    )

}

export default VacationsReports;
