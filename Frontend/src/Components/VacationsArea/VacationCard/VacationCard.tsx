import EventIcon from '@mui/icons-material/Event';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import VacationModel from "../../../Models/VacationModel";
import { adminVacationsStore } from '../../../Redux/AdminVacationsState';
import adminVacationsService from '../../../Services/adminVacationsService';
import userVacationsService from '../../../Services/userVacationsService';
import appConfig from '../../../Utils/AppConfig';
import notify from '../../../Utils/Notify';
import "./VacationCard.css";
import { authStore } from '../../../Redux/AuthState';
import followersService from '../../../Services/FollowingService';
import { Button } from 'react-bootstrap';


interface VacationCardProps {
    vacation: VacationModel;
    // user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    // Delete Vacation
    async function handleDelete(vacationId: number) {
        try {
            // ask the user if he really wants to delete the vacation
            const result = window.confirm('Are you sure you want to delete this vacation?');
            if (!result) return;

            // // delete vacation from the server
            await adminVacationsService.deleteVacation(vacationId);
            notify.success("Vacation deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    function isFollowing(isFollowing: number): Boolean {
        return isFollowing === 1 ? true : false;
    }

    async function follow(vacationId: number): Promise<void> {
        try {
            await followersService.addUserFollow(props.vacation.vacationId);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    async function unfollow(vacationId: number): Promise<void> {
        try {
            await followersService.UserUnfollow(props.vacation.vacationId);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationCard">
            <Card sx={{ maxWidth: 345, backgroundColor: "white", display: "flex", cursor: "all-scroll", overflow: "auto" }}>
                <CardActionArea sx={{ cursor: "default" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={props.vacation?.imageName}
                        alt={props.vacation.destination}
                    >
                    </CardMedia>
                    <CardContent sx={{ backgroundColor: "white", height: "230px" }}>
                        {user && user.role === "User" && (
                            <div>

                                {!isFollowing(props.vacation.idFollowing) ? <button className='FollowBtn' onClick={() => follow(props.vacation.vacationId)} ><FavoriteBorderIcon />
                                </button> : <button className='UnfollowBtn' onClick={() => unfollow(props.vacation.vacationId)}><FavoriteIcon /></button>} <br />
                                <span className='TotalPrice'> Total price: <span className='Price'>  ${props.vacation.price}</span></span>

                            </div>
                        )}
                        <Typography gutterBottom variant="h5" component="div">
                            {props.vacation.destination} &nbsp;&nbsp;
                            {user && user.role === "Admin" && (
                                <>
                                    <IconButton aria-label='edit'
                                        aria-haspopup="true"
                                        color='primary'
                                        // sx={{ marginLeft: "auto" }}
                                        onClick={() => navigate("/vacations/edit/" + props.vacation.vacationId)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color='error'
                                        sx={{ marginLeft: "auto" }}
                                        onClick={() => { handleDelete(props.vacation?.vacationId) }}>
                                        <ClearIcon />
                                    </IconButton>
                                </>
                            )}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                            <EventIcon fontSize='small' /> &nbsp; {props.vacation.startDate.slice(0, 10).split("-").reverse().join("/")} - {props.vacation.endDate.slice(0, 10).split("-").reverse().join("/")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ paddingTop: "10px" }}>
                            {props.vacation.description} <br />
                        </Typography>
                        {user && user.role === "User" && (
                            <div>
                                <br />
                                <span className='Likes'>   Likes: {props.vacation.followersCount}</span>
                            </div>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
}

export default VacationCard;
