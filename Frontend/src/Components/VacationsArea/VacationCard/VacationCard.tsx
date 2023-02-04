import EventIcon from '@mui/icons-material/Event';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import VacationModel from "../../../Models/VacationModel";
import userVacationsService from '../../../Services/userVacationsService';
import appConfig from '../../../Utils/AppConfig';
import notify from '../../../Utils/Notify';
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

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
            <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        height="140"
                        // image={props.vacation?.imageName}
                        alt="Paris, France"
                    >
                    </CardMedia>

                    <CardContent sx={{ backgroundColor: "white" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.vacation.destination}
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
