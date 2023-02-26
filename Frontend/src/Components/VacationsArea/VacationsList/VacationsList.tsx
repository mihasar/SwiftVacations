import BoltIcon from '@mui/icons-material/Bolt';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import VacationModel from '../../../Models/VacationModel';
import { adminVacationsStore } from '../../../Redux/AdminVacationsState';
import { authStore } from '../../../Redux/AuthState';
import { userVacationsStore } from '../../../Redux/UserVacationsState';
import userVacationsService from '../../../Services/userVacationsService';
import notify from '../../../Utils/Notify';
import Pagination from '../../LayoutArea/Pagination/Pagination';
import VacationCard from '../VacationCard/VacationCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, Tooltip } from '@mui/material';
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [isLiked, setIsLiked] = useState(false);
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [showActive, setShowActive] = useState(false);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage, setVacationsPerPage] = useState(6);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {

        // Check if user is logged in. If not, navigate him back to "Login" page.
        if (!authStore.getState().user) {
            navigate("/login");
        }

        // Check if the user is Admin or user
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        }

    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [isLiked, isUpcoming, showActive]);

    // Get all vacations for user
    useEffect(() => {
        userVacationsService.getAllVacationsForUser()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));

        // Listen to changes in redux and setVacations accordingly
        adminVacationsStore.subscribe(() => { setVacations(adminVacationsStore.getState().adminVacations) });
    }, []);

    // Get users favorite vacations that he/she liked
    useEffect(() => {
        try {
            userVacationsService.getUserFavoriteVacations();
            userVacationsStore.subscribe(() => {
                const duplicate = [...userVacationsStore.getState().userVacations];
                setVacations(duplicate);
            })
        }
        catch (err: any) {
            notify.error(err);
        }
    }, []);

    // Set isLiked according to checkbox
    const handleLikedChange = () => {
        setIsLiked(!isLiked);
    }

    // Set isUpcoming according to checkbox
    const handleUpcomingChange = () => {
        setIsUpcoming(!isUpcoming);
    }

    // Set showActive according to checkbox
    const handleActiveChange = () => {
        setShowActive(!showActive);
    }

    // Reset all checkbox
    const handleResetCheckbox = () => {
        setIsLiked(false);
        setIsUpcoming(false);
        setShowActive(false);
    }

    // Using Filter for getting the right vacations per every checkbox and slice for using pagination 
    const lastVacationIndex = CurrentPage * vacationsPerPage;
    const firstVacationIndex = lastVacationIndex - vacationsPerPage;
    const currentVacations = vacations
        .filter(v => !isLiked || v.isFollowing === 1)
        .filter(v => !isUpcoming || new Date(v.startDate) > new Date())
        .filter(v => !showActive || (new Date(v.startDate) <= new Date() && new Date(v.endDate) > new Date()))
        .slice(firstVacationIndex, lastVacationIndex);

    return (
        <div className="VacationsList">

            {/* If you are admin - show different header */}
            {user && user.role === "Admin" && (
                <div>

                    <h2>Your Current Vacations</h2>

                    <NavLink to="/vacations/new"><Button className='AddBtn'>Add Vacation</Button></NavLink>

                </div>
            )}

            {/* If you are user - show different header and 3 checkboxes + reset button */}
            {user && user.role === "User" && (
                <div>
                    <h2>Our vacations that you can get in a <b>Swift</b> <BoltIcon sx={{ color: 'aquamarine' }} /></h2> <br />
                    <div className='CheckboxDiv'>

                        <label>
                            <input type="checkbox" checked={isLiked} onChange={handleLikedChange} />
                            Liked Vacations
                        </label>

                        <label>
                            <input type="checkbox" checked={isUpcoming} onChange={handleUpcomingChange} />
                            Upcoming Vacations
                        </label>

                        <label>
                            <input type="checkbox" checked={showActive} onChange={handleActiveChange} />
                            Active Vacations
                        </label> &nbsp;

                        {/* Reset button */}
                        <Tooltip title="Reset Filters">
                            <IconButton onClick={handleResetCheckbox}>
                                <RestartAltIcon />
                            </IconButton>
                        </Tooltip>

                    </div>
                </div>
            )}

            {/* Show All vacations */}
            <div className='Cards'>
                {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>

            {/* Implemented Pagination component */}
            <Pagination
                vacationsPerPage={vacationsPerPage}
                totalVacations={vacations.length}
                currentPage={CurrentPage}
                setCurrentPage={setCurrentPage} />

        </div>
    );
}

export default VacationsList;