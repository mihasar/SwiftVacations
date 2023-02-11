import { RegisterOptions } from "react-hook-form";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;
    public idFollowing: number;
    public followersCount: number;

    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 3, message: "Destination must be minimum 3 chars" },
        maxLength: { value: 50, message: "Destination can't exceed 50 chars" }
    };

    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 5, message: "Description must be minimum 5 chars" },
        maxLength: { value: 1000, message: "Description can't exceed 1000 chars." }
    }

    public static startDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing start date" },
    }

    public static endDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing end date" },
    }

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 100, message: "Price can't be less than $100" },
        max: { value: 10000, message: "Price can't exceed 10,000" }
    }

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" },
    }
}

export default VacationModel;