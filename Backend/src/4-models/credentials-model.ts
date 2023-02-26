import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string
    public password: string;

    public constructor(user: CredentialsModel) {

        this.email = user.email
        this.password = user.password;
    }

    private static credentialsSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    public credentialsValidate(): void {
        const result = CredentialsModel.credentialsSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;