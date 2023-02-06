import { RegisterOptions } from "react-hook-form";

class CredentialsModel {
    public email: string;
    public password: string;

    // Validation:
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 4, message: "email must be minimum 4 chars." },
        maxLength: { value: 30, message: "email can't exceeds 30 chars." }
    }

    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing Password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars." },
        maxLength: { value: 30, message: "Password can't exceeds 30 chars." }
    }

}

export default CredentialsModel;
