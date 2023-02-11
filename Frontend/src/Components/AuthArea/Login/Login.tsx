import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./Login.css";
import Footer from "../../LayoutArea/Footer/Footer";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.Login(credentials);
            notify.success("Welcome back " + credentials.email);
            navigate("/home");
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

                <h4>Have an account already? <span onClick={() => {
                    navigate("/register")
                }}>Register</span></h4>

            </form>

            <Footer />
        </div>
    );
}

export default Login;















{/* <Typography variant="h2">
                    Login
                </Typography> */}

{/* <TextField label="Email" type="email" variant="outlined" className="TextBox" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <br /><br /><br />
                <ButtonGroup variant="outlined" fullWidth>
                    <Button sx={{ backgroundColor: "green", color: "black" }} color="success">
                        Login &nbsp;

                    </Button>
                    <Button sx={{ backgroundColor: "red", color: "black" }} color="secondary" type="reset">
                        Clear &nbsp;
                        <HighlightOffIcon />
                    </Button>
                </ButtonGroup> */}