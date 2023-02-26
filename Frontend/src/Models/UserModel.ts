import { RegisterOptions } from "react-hook-form";
import RoleModel from "./RoleModel";

class UserModel {
    
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string; 
    public password: string;
    public role: RoleModel;

    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing First name" },
        minLength: { value: 2, message: "First name must be minimum 2 chars" },
        maxLength: { value: 30, message: "First name can't exceeds 30 chars" }
    };

    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing Last name" },
        minLength: { value: 2, message: "Last name must be minimum 2 chars." },
        maxLength: { value: 30, message: "Last name can't exceeds 30 chars." }
    }

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

export default UserModel;