import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    // Register:
    public async register(user: UserModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get the returned token:
        const token = response.data;

        // Send Token to global state:
        authStore.dispatch({ type: AuthActionType.Register, payload: token });

    }

    // Login:
    public async Login(credentials: CredentialsModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials)

        // Get the returned token:
        const token = response.data;
    
        // Send Token to global state:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
        
    }

    // Logout:
    public Logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
        userVacationsStore.dispatch({type: UserVacationsActionType.FetchUserVacation, payload: []});
    }

    // Is user logged in:
    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

}

const authService = new AuthService();

export default authService;