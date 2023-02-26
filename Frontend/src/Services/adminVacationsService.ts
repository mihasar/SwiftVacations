import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { AdminVacationsActionType, adminVacationsStore } from "../Redux/AdminVacationsState";
import appConfig from "../Utils/AppConfig";

class AdminVacationsService {

    // Get all vacations for admin:
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

    // Get all reports for admin:
    public async getAllReportsForAdmin(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let adminVacations = adminVacationsStore.getState().adminVacations;

        // If we don't have vacations:
        if (adminVacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.adminReportsUrl);
            adminVacations = response.data;

            adminVacationsStore.dispatch({ type: AdminVacationsActionType.FetchVacation, payload: adminVacations })
        }

        // Return vacations:
        return adminVacations;
    }

    // Get one vacation for admin:
    public async getOneVacationForAdmin(vacationId: number): Promise<VacationModel> {

        // Take vacations from global state:
        let adminVacations = adminVacationsStore.getState().adminVacations;

        let adminVacation = adminVacations.find(v => v.vacationId === vacationId);

        // If we don't have vacations:
        if (!adminVacation) {
            const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
            adminVacation = response.data;
        }

        // Return vacations:
        return adminVacation;
    }

    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;

        addedVacation.imageName = appConfig.adminVacationsImagesUrl + addedVacation.imageName;

        adminVacationsStore.dispatch({ type: AdminVacationsActionType.AddVacation, payload: addedVacation });

    }

    // Update vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updateVacation = response.data;
        
        updateVacation.imageName = appConfig.adminVacationsImagesUrl + updateVacation.imageName;

        adminVacationsStore.dispatch({ type: AdminVacationsActionType.UpdateVacation, payload: updateVacation });

    }

    // Delete vacation:
    public async deleteVacation(id: number): Promise<void> {

        await axios.delete(appConfig.adminVacationsUrl + id);

        // Send deleted vacations into redux global state (which will call the reducer):
        adminVacationsStore.dispatch({ type: AdminVacationsActionType.DeleteVacation, payload: id });

    }

}

const adminVacationsService = new AdminVacationsService();

export default adminVacationsService;
