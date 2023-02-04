import { RegisterOptions } from "react-hook-form";

class VacationModel {

    // TODO check with northwind fullstack if this class with image, imageName is wrote correctly.
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;
    public idFollowing: number;
    public followerCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

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
        minLength: { value: 0, message: "Price must be minimum 1 number." },
        maxLength: { value: 1000, message: "Price can't exceed 1000 numbers." }
    }

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" },
    }
}

export default VacationModel;