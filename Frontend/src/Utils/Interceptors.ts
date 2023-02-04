import axios from "axios";
import { authStore } from "../Redux/AuthState";
import authService from "../Services/AuthService";

class Interceptors {

    public create(): void {

        // Add request interceptor:
        axios.interceptors.request.use(request => {

            if (authService.isLoggedIn()) {

                // Add authorization header containing the string: 
                request.headers.authorization = "Bearer " + authStore.getState().token;
            }
            
            return request;

        });

    }


}

const interceptors = new Interceptors();

export default interceptors;