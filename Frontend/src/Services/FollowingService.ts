import axios from "axios";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class FollowingService {

    // Add follow (like for user):
    public async addUserFollow(vacationId: number): Promise<void> {

        await axios.post(appConfig.followUrl + vacationId);

        userVacationsStore.dispatch({ type: UserVacationsActionType.follow, payload: vacationId });

    }

    // Remove follow (unlike for user):
    public async userUnfollow(vacationId: number): Promise<void> {

        await axios.delete(appConfig.followUrl + vacationId)

        userVacationsStore.dispatch({ type: UserVacationsActionType.unfollow, payload: vacationId });
        userVacationsStore.dispatch({ type: UserVacationsActionType.RemoveFollow, payload: vacationId });

    }
}

const followingService = new FollowingService();

export default followingService;