import axios from "axios";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class FollowingService {



    public async addUserFollow(vacationId: number): Promise<void> {
        const response = await axios.post(appConfig.followUrl + vacationId);
        const addedFollow = response.data;
        userVacationsStore.dispatch({ type: UserVacationsActionType.follow, payload: vacationId })
        userVacationsStore.dispatch({ type: UserVacationsActionType.AddFollow, payload: vacationId })
    }

    public async UserUnfollow(vacationId: number): Promise<void> {
        await axios.delete(appConfig.followUrl + vacationId)
        userVacationsStore.dispatch({ type: UserVacationsActionType.unfollow, payload: vacationId })
        userVacationsStore.dispatch({ type: UserVacationsActionType.RemoveFollow, payload: vacationId })
    }
}

const followingService = new FollowingService();
export default followingService