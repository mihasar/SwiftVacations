import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class FollowersService {

    public async addUserFollow(vacationId: number): Promise<void> {
        // const headers = { "Content-Type": "multipart/form-data" };
        await axios.post(appConfig.followUrl + vacationId);

        userVacationsStore.dispatch({ type: UserVacationsActionType.follow, payload: vacationId });
        userVacationsStore.dispatch({ type: UserVacationsActionType.AddFollow, payload: vacationId });
    }

    public async UserUnfollow(vacationId: number): Promise<void> {
        await axios.delete(appConfig.followUrl + vacationId);

        userVacationsStore.dispatch({ type: UserVacationsActionType.unfollow, payload: vacationId });
        userVacationsStore.dispatch({ type: UserVacationsActionType.RemoveFollow, payload: vacationId });
    }

}

const followersService = new FollowersService();

export default followersService;
