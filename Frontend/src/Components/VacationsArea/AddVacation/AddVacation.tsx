import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationService from "../../../Services/adminVacationsService";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

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

    async function send(vacation: VacationModel) {
        const startTime = new Date(vacation.startDate);
        const endTime = new Date(vacation.endDate);
        if (endTime.getTime() < startTime.getTime()) {
            notify.error("You can't pick end date early than start date!");
        }
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            notify.success("Vacation has been added");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div>
            {user && user.role === "Admin" && (
                <>
                    <div className="AddVacation Box">

                        <h2>Add vacation
                            <IconButton aria-label='edit'
                                aria-haspopup="true"
                                color='primary'
                                className='GoBackIcon'
                                onClick={() => navigate(-1)}>
                                <KeyboardBackspaceIcon />
                            </IconButton>
                        </h2>

                        <form onSubmit={handleSubmit(send)}>

                            <input type="text" placeholder="Destination" {...register("destination", VacationModel.destinationValidation)} />
                            <span className="Err">{formState.errors.destination?.message}</span>

                            <input type="text" placeholder="Description" className="DescriptionTextBox" {...register("description", VacationModel.descriptionValidation)} />
                            <span className="Err">{formState.errors.description?.message}</span>

                            <label>Start Date </label>
                            <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} {...register("startDate", VacationModel.startDateValidation)} />
                            <span className="Err">{formState.errors.startDate?.message}</span>

                            <label>End Date </label>
                            <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} {...register("endDate", VacationModel.startDateValidation)} />
                            <span className="Err">{formState.errors.endDate?.message}</span>

                            <input type="number" step="0.01" placeholder="$ Price" {...register("price", VacationModel.priceValidation)} />
                            <span className="Err">{formState.errors.price?.message}</span>

                            <input type="file" multiple accept="image/*" className="InputImage" {...register("image", VacationModel.imageValidation)} />
                            <span className="Err">{formState.errors.image?.message}</span>

                            <button>add</button>

                        </form>

                    </div>
                </>
            )}
        </div >
    );
}

export default AddVacation;
