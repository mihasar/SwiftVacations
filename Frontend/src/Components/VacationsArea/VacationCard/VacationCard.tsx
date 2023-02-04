import EventIcon from '@mui/icons-material/Event';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from 'react';
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

interface VacationCardProps {
    vacation: VacationModel;
    // user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();

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

    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toLocaleString("he-IL");
    }

    function isFollowing(follow: Number) {
        return follow === 1 ? true : false;

    }

    function follow() {
        userVacationsService.addUserFollow(props.vacation.vacationId)
            .then(() => console.log("Follow"))
            .catch(err => notify.error(err));
    }

    function unfollow() {
        userVacationsService.UserUnfollow(props.vacation.vacationId)
            .then(() => console.log("Unfollow"))
            .catch(err => notify.error(err));
    }

    return (
        <div className="VacationCard">


            {/* <Link to="#" onClick={deleteProduct}>Delete</Link> */}

            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        height="140"
                        image={props.vacation?.imageName}
                        alt={props.vacation.destination}
                    >
                    </CardMedia>

                    <CardContent sx={{ backgroundColor: "white" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.vacation.destination}
                            <IconButton aria-label='edit'
                                aria-haspopup="true"
                                color='primary'
                                sx={{ marginLeft: "85px" }}
                                onClick={() => navigate("/vacations/edit/" + props.vacation.vacationId)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color='error'
                                sx={{ marginLeft: "5px" }}
                                onClick={() => { handleDelete(props.vacation?.vacationId) }}>
                                <ClearIcon />
                            </IconButton>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" className='VacationLength'>
                            <EventIcon fontSize='small' /> {formatTime(props.vacation.startDate)} - {formatTime(props.vacation.endDate)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.vacation.description} <br />
                            <FavoriteBorderIcon className='Follow' />
                        </Typography>
                        {/* {isFollowing(props.vacation.idFollowing) ? <button onClick={unfollow} /> : <button onClick={follow} />} */}
                        {/* {isFollowing(props.vacation.idFollowing) ? <button onClick={unfollow} className="btn btn-success followButton" > ❤
                        </button> : <button onClick={follow} className="btn btn-danger followButton">❤ </button>} */}
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
}

export default VacationCard;
