import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static userSchema = Joi.object({
        userId: Joi.number().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        role: Joi.optional()
    });

    public userValidate(): void {
        const result = UserModel.userSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default UserModel;