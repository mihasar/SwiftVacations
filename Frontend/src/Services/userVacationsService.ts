import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {

    // Get all vacations for user:
    public async getAllVacationsForUser(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let userVacations = userVacationsStore.getState().userVacations;

        // If we don't have vacations:
        if (userVacations.length === 0) {

            // Fetch vacations from backend:
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            const userVacations = response.data;

            userVacationsStore.dispatch({ type: UserVacationsActionType.FetchUserVacation, payload: userVacations });

        }

        // Return vacations:
        return userVacations;

    }

    // Get favorite vacations for user:
    public async getUserFavoriteVacations(): Promise<VacationModel[]> {

        // Get all vacations for user:
        let vacations = await this.getAllVacationsForUser();

        // Check if the user liked or not the vacation:
        const favoriteVacations = vacations.filter(v => v.isFollowing === 1 && v)

        await this.getAllVacationsForUser();

        // Return favorite vacations:
        return favoriteVacations;

    }

}

const userVacationsService = new UserVacationsService();

export default userVacationsService;
