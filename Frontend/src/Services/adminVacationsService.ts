import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { AdminVacationsActionType, adminVacationsStore } from "../Redux/AdminVacationsState";
import appConfig from "../Utils/AppConfig";

class AdminVacationsService {

    public async getAllVacationsForAdmin(): Promise<VacationModel[]> {
        // Take vacations from global state:
        let adminVacations = adminVacationsStore.getState().adminVacations;

        // If we don't have vacations:
        if (adminVacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
            adminVacations = response.data;
            
            adminVacationsStore.dispatch({ type: AdminVacationsActionType.FetchVacation, payload: adminVacations })
        }

        // Return vacations:
        return adminVacations;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;

        adminVacationsStore.dispatch({ type: AdminVacationsActionType.AddVacation, payload: addedVacation });
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, { headers });
        const updateVacation = response.data;

        adminVacationsStore.dispatch({ type: AdminVacationsActionType.UpdateVacation, payload: updateVacation });
    }

    public async deleteProduct(id: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + id);

        // Send deleted vacations into redux global state (which will call the reducer):
        adminVacationsStore.dispatch({ type: AdminVacationsActionType.DeleteVacation, payload: id });
    }

}

const adminVacationsService = new AdminVacationsService();

export default adminVacationsService;
