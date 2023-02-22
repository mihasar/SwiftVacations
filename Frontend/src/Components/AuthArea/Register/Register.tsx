import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./Register.css";
import Footer from "../../LayoutArea/Footer/Footer";
import notify from "../../../Utils/Notify";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/home");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Register Box">

            <form onSubmit={handleSubmit(send)}>

                <h1>Register</h1>
                <br></br> 

                <input type="text" placeholder="First name" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <input type="text" placeholder="Last name" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>

                <input type="email" placeholder="Email" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <input type="password" placeholder="Password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>
                <br></br><br></br> 

                <button>Register</button>

                <h4>Have an account already? <span onClick={() => {
                    navigate("/login")
                }}>log in</span></h4>

            </form>

            <Footer />
        </div>
    );
}

export default Register;



















{/* <Typography variant="h2">
                    Register
                </Typography>


                <TextField label="First name" variant="outlined" className="TextBox"  {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <TextField label="Last name" variant="outlined" className="TextBox"  {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>

                <TextField label="Email" type="email" variant="outlined" className="TextBox" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <br /><br /><br />
                <ButtonGroup variant="outlined" fullWidth>
                    <Button sx={{ backgroundColor: "green", color: "black" }} color="success">
                        Register &nbsp;

                    </Button>
                    <Button sx={{ backgroundColor: "red", color: "black" }} color="secondary" type="reset">
                        Clear &nbsp;
                        <HighlightOffIcon />
                    </Button>
                </ButtonGroup> */}