import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {

    public async getAllVacationsForUser(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let userVacations = userVacationsStore.getState().userVacations;

        // If we don't have vacations:
        if (userVacations.length === 0) {

            // Fetch vacations from backend:
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            const userVacations = response.data;

            userVacationsStore.dispatch({ type: UserVacationsActionType.FetchUserVacation, payload: userVacations })
        }

        // Return vacations:
        return userVacations;
    }

    public async addUserFollow(userId: number): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.post(appConfig.userVacationsUrl + userId, { headers });

        userVacationsStore.dispatch({ type: UserVacationsActionType.AddFollow, payload: userId });
    }

    public async UserUnfollow(userId: number): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.delete(appConfig.userVacationsUrl + userId, { headers });

        userVacationsStore.dispatch({ type: UserVacationsActionType.RemoveFollow, payload: userId });
    }

}

const userVacationsService = new UserVacationsService();

export default userVacationsService;
