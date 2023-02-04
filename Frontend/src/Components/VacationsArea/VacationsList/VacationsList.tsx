import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
// import adminVacationsService from '../../../Services/adminVacationsService';
import userVacationsService from '../../../Services/userVacationsService';
import notify from '../../../Utils/Notify';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Footer from '../../LayoutArea/Footer/Footer';
import VacationCard from '../VacationCard/VacationCard';
import "./VacationsList.css";
import UserModel from '../../../Models/UserModel';
import RoleModel from '../../../Models/RoleModel';

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        userVacationsService.getAllVacationsForUser()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, [vacations])

    return (


        <div className="VacationsList">

            <h3>Some of our best destinations:</h3> <br />

            {/* {
                user?.role === RoleModel.Admin ?
                    (
                        <>

                        </>
                    ) : (
                        <>
                        </>
                    )
            } */}
            <NavLink to="/vacations/new"><PostAddIcon fontSize='large' sx={{ marginLeft: "100%", color: "darkolivegreen" }} /></NavLink>

            <div className='Cards'>

                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}

            </div>


            {/* TODO - Good activation of pagination */}
            <Footer />
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