import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import Footer from "../../LayoutArea/Footer/Footer";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.Login(credentials);
            notify.success("Welcome back");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login Box">

            <form onSubmit={handleSubmit(send)}>

                <h1>Login</h1>
                <br></br><br></br>

                <input type="email" placeholder="Email" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <input type="password" placeholder="Password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <br></br><br></br>

                <button>Login </button>

                <h4>Don't have an account? <span onClick={() => {
                    navigate("/register")
                }}>Register</span></h4>

            </form>

            <Footer />

        </div>
    );
}

export default Login;