import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import Footer from "../../LayoutArea/Footer/Footer";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
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