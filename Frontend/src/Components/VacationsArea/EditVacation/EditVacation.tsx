import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from '../../../Redux/AuthState';
import adminVacationsService from "../../../Services/adminVacationsService";
import notify from "../../../Utils/Notify";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "./EditVacation.css";
import { IconButton } from '@mui/material';

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [user, setUser] = useState<UserModel>();
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!authStore.getState().user) {
            navigate("/login");
        }
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        adminVacationsService.getOneVacationForAdmin(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                const startDate = new Date(vacation.startDate)
                const nextStartDate = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().slice(0, -14);
                setValue("startDate", nextStartDate);
                const endDate = new Date(vacation.endDate);
                const nextEndDate = new Date(endDate.setDate(endDate.getDate() + 1)).toISOString().slice(0, -14);
                setValue("endDate", nextEndDate);
                console.log(nextEndDate);
                console.log(nextStartDate);
                setValue("price", vacation.price);
                setVacation(vacation);
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        const startTime = new Date(vacation.startDate);
        const endTime = new Date(vacation.endDate);
        if (endTime.getTime() < startTime.getTime()) {
            notify.error("You can't pick end date early than start date!");
        }
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminVacationsService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate(-1);
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <div>
            {user && user.role === "Admin" && (
                <>
                    <div className="EditVacation Box">

                        <h2>Edit Vacation
                            <IconButton aria-label='edit'
                                aria-haspopup="true"
                                color='primary'
                                className='GoBackIcon'
                                onClick={() => navigate(-1)}>
                                <KeyboardBackspaceIcon />
                            </IconButton>
                        </h2>

                        <form onSubmit={handleSubmit(send)}>

                            {/* Hiding */}
                            <input type="hidden" {...register("vacationId")} />

                            <input type="text" placeholder='Destination'{...register("destination", VacationModel.destinationValidation)} />
                            <span className="Err">{formState.errors.destination?.message}</span>

                            <input type="text" placeholder='Description' className='DescriptionTextBox' {...register("description", VacationModel.descriptionValidation)} />
                            <span className="Err">{formState.errors.description?.message}</span>

                            <label>Start Date </label>
                            <input type="date" min={new Date().toISOString().slice(0, -8)} {...register("startDate", VacationModel.startDateValidation)} />
                            <span className="Err">{formState.errors.startDate?.message}</span>

                            <label>End Date </label>
                            <input type="date" min={new Date().toISOString().slice(0, -8)} {...register("endDate", VacationModel.endDateValidation)} />
                            <span className="Err">{formState.errors.endDate?.message}</span>

                            <input type="number" step="0.01" placeholder='Price' {...register("price", VacationModel.priceValidation)} />
                            <span className="Err">{formState.errors.price?.message}</span>

                            <input type="file" accept="image/*" className='InputImage' {...register("image", VacationModel.imageValidation)} />
                            <span>
                                <img className='CurrentImage' alt='vacation' src={vacation?.imageName} />
                            </span>
                            <span className="Err">{formState.errors.image?.message}</span>

                            <br /><br />

                            <button>Update <CheckCircleIcon fontSize="medium" /></button>

                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditVacation;
