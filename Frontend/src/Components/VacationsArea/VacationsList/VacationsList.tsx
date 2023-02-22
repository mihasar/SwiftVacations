import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [isLiked, setIsLiked] = useState(false);
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [showActive, setShowActive] = useState(false);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage, setVacationsPerPage] = useState(3);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {
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

    useEffect(() => {
        userVacationsService.getAllVacationsForUser()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
        // Listen to changes in redux and setVacations accordingly
        adminVacationsStore.subscribe(() => { setVacations(adminVacationsStore.getState().adminVacations) });
    }, []);

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

    const lastVacationIndex = CurrentPage * vacationsPerPage;
    const firstVacationIndex = lastVacationIndex - vacationsPerPage;
    const currentVacations = vacations
        .filter(v => !isLiked || v.idFollowing === 1)
        .filter(v => !isUpcoming || new Date(v.startDate) > new Date())
        .filter(v => !showActive || (new Date(v.startDate) <= new Date() && new Date(v.endDate) > new Date()))
        .slice(firstVacationIndex, lastVacationIndex);

    return (
        <div className="VacationsList">

            {/* {user && user.role === "" && (
                <div>
                    {navigate("/login")}
                </div>
            )} */}

            {user && user.role === "Admin" && (
                <div>
                    <h2>Your Current Vacations</h2>
                    <NavLink to="/vacations/new"> <Button className='AddBtn'> Add Vacation <AddCircleOutlineIcon fontSize='large' sx={{ color: "darkcyan", fontSize: "12px" }}  /></Button></NavLink>
                </div>
            )}

            {user && user.role === "User" && (
                <div>
                    <h2>Our vacations that you can get in a <b>Swift</b><BoltIcon sx={{ color: 'aquamarine' }} /></h2> <br />
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
                        </label>
                    </div>
                </div>
            )}

            <div className='Cards'>
                {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>

            <Pagination vacationsPerPage={vacationsPerPage} totalVacations={vacations.length} currentPage={CurrentPage} setCurrentPage={setCurrentPage} />

        </div>
    );
}

export default VacationsList;















{/* <div className='Cards'>


                <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
                    <CardActionArea>

                        <CardMedia
                            component="img"
                            height="140"
                            image={parisImage}
                            alt="Paris, France"
                        />
                        <CardContent sx={{ backgroundColor: "white" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Paris, France
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Known as the "City of Love," Paris is famous for its romantic atmosphere, iconic landmarks such as the Eiffel Tower and Notre-Dame Cathedral, and world-renowned museums like the Louvre.
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={baliImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Bali, Indonesia
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Known for its beautiful beaches, temples, and vibrant culture, Bali is a popular destination for both relaxation and adventure. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={tokyoImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tokyo, Japan
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Japan's bustling capital city is known for its vibrant nightlife, delicious food and cutting-edge technology. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={newYorkImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                New York City, USA
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                The city that never sleeps, New York is known for its skyscrapers, Broadway shows, and famous landmarks such as the Statue of Liberty and Central Park. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={santoriniImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Santorini, Greece
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This island in the Aegean Sea is famous for its stunning sunsets, white-washed buildings, and blue-domed churches. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={maldivesImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Maldives
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Famous for crystal clear waters, white sandy beaches and tropical climate, Maldives is a dream destination for many beach and water sports enthusiasts. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={cancunImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Cancun, Mexico
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Known for its beautiful beaches and turquoise waters, Cancun is a popular destination for spring breakers and tourists looking to relax in the sun. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={sydneyImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Sydney, Australia
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                                <EventIcon fontSize='small'/> 12\02\2023 - 18\02\2023 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Known for its iconic Opera House and Harbour Bridge, Sydney is a popular destination for its beaches, culture and bustling city life. <br /><br />
                                <FavoriteBorderIcon className='Follow' />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div> */}