import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, CardActionArea, CardContent, CardMedia, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from '../../../Redux/AuthState';
import adminVacationsService from '../../../Services/adminVacationsService';
import followersService from '../../../Services/FollowingService';
import notify from '../../../Utils/Notify';
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<UserModel>();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Checking if the user or admin is connected to the website
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

    // Check if the user following the vacation. If he follows - show filled Red heart button. If he isn't following - show empty Red heart.
    function isFollowing(isFollowing: number): Boolean {
        return isFollowing === 1 ? true : false;
    }

    // Follow function (Like the vacation)
    async function follow(vacationId: number): Promise<void> {
        try {
            await followersService.addUserFollow(vacationId);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Unfollow function (Remove the like from the vacation)
    async function unfollow(vacationId: number): Promise<void> {
        try {
            await followersService.userUnfollow(vacationId);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Styling my description modal 
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid lightseagreen',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="VacationCard">

            {/* Vacation Card using MUI Material */}
            <Card sx={{ maxWidth: 345, backgroundColor: "white", display: "flex", cursor: "all-scroll", overflow: "auto" }}>
                <CardActionArea sx={{ cursor: "default" }}>
                    {/* Image */}
                    <CardMedia
                        component="img"
                        height="200"
                        image={props.vacation?.imageName}
                        alt={props.vacation.destination}>
                    </CardMedia>
                    <CardContent sx={{ backgroundColor: "white", height: "230px", width: "330px" }}>
                        {/* If you are user - show the like/unlike button and show how many likes this vacation has from other user including this user. */}
                        {user && user.role === "User" &&
                            <div>
                                {!isFollowing(props.vacation.isFollowing) ? <button className='FollowBtn' onClick={() => follow(props.vacation.vacationId)} ><FavoriteBorderIcon />
                                </button> : <button className='UnfollowBtn' onClick={() => unfollow(props.vacation.vacationId)}><FavoriteIcon /></button>}
                                <span className='Likes'>Likes: {props.vacation.followersCount}</span>
                            </div>
                        }
                        <Typography gutterBottom variant="h5" component="div">
                            {/* Destination of the vacation */}
                            {props.vacation.destination} &nbsp;
                            {/* If you are admin - show the edit and delete buttons. */}
                            {user && user.role === "Admin" && (
                                <>
                                    {/* Show little description of the icon functionality when you hover above and when you click it you can edit the vacation. */}
                                    <Tooltip title="Edit Vacation">
                                        <IconButton aria-label='edit'
                                            aria-haspopup="true"
                                            color='primary'
                                            onClick={() => navigate("/vacations/edit/" + props.vacation.vacationId)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* Show little description of the icon functionality when you hover above and when you click it you can delete the vacation.*/}
                                    <Tooltip title="Delete Vacation">
                                        <IconButton
                                            color='error'
                                            onClick={() => { handleDelete(props.vacation?.vacationId) }}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" className='VacationDates'>
                            {/* Dates of the vacation: when is starts and when it ends. */}
                            <EventIcon fontSize='small' /> &nbsp; {props.vacation.startDate.slice(0, 10).split("-").reverse().join("/")} - {props.vacation.endDate.slice(0, 10).split("-").reverse().join("/")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ paddingTop: "10px" }}>
                            {/* When you press 'More Info' button, you get in a pop-up the description of the vacation. */}
                            <Button className='ModalButton' onClick={handleOpen}>More Info</Button>
                            {/* Modal of the description */}
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" className='DescriptionModal' variant="h6" component="h2">
                                        <h2>{props.vacation.destination}</h2>
                                    </Typography>
                                    <Typography id="modal-modal-description" className='DescriptionModal' sx={{ mt: 10 }}>
                                        {props.vacation.description}
                                        <br />
                                        {/* Close the modal button */}
                                        <IconButton
                                            onClick={() => { handleClose() }}>
                                            <CloseIcon sx={{ marginTop: "18%" }} />
                                        </IconButton>
                                    </Typography>
                                </Box>
                            </Modal>
                        </Typography>
                        <br></br><br></br>
                        {/* If you are user - show the total price of the vacation */}
                        {user && user.role === "User" &&
                            <span className='TotalPrice'> Total price: <span className='Price'>${props.vacation.price}</span></span>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
}

export default VacationCard;
