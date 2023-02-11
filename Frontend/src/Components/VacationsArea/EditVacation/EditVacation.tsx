import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from '../../../Redux/AuthState';
import adminVacationsService from "../../../Services/adminVacationsService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();
    const params = useParams();

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
        adminVacationsService.getOneVacationForAdmin(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("imageName", vacation.imageName);
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
            alert("Vacation has been updated.");
            navigate(-1);
        }
        catch (err: any) {
            alert(err.message);
        }
    }


    return (
        <div>
            {user && user.role === "Admin" && (
                <>
                    <div className="EditVacation Box">

                        <h2>Edit Vacation</h2>

                        <form onSubmit={handleSubmit(send)}>

                            {/* Hiding */}
                            <input type="hidden" {...register("vacationId")} />

                            <label>Destination: </label>
                            <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                            <span className="Err">{formState.errors.destination?.message}</span>

                            <label>Description: </label>
                            <input type="text" className='DescriptionTextBox' {...register("description", VacationModel.descriptionValidation)} />
                            <span className="Err">{formState.errors.description?.message}</span>

                            <label>Start Date: </label>
                            <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} {...register("startDate", VacationModel.startDateValidation)} />
                            <span className="Err">{formState.errors.startDate?.message}</span>

                            <label>End Date: </label>
                            <input type="datetime-local" min={new Date().toISOString().slice(0, -8)} {...register("endDate", VacationModel.endDateValidation)} />
                            <span className="Err">{formState.errors.endDate?.message}</span>

                            <label>Price: </label>
                            <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                            <span className="Err">{formState.errors.price?.message}</span>

                            <label>Image: </label>
                            <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
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
