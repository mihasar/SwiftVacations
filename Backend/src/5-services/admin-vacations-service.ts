import { OkPacket } from "mysql";
import appConfig from "../2-utils/appConfig";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {

    const sql = `SELECT *, CONCAT('${appConfig.adminVacationImagesAddress}', imageName) AS imageName FROM vacations ORDER BY startDate`;
    const vacations = await dal.execute(sql);
    return vacations;

}

async function getOneVacationForAdmin(vacationId: number): Promise<VacationModel> {

    const sql = `SELECT *, CONCAT('${appConfig.adminVacationImagesAddress}', imageName) AS imageName FROM vacations
                 WHERE vacationId = ?`;

    const vacations = await dal.execute(sql, vacationId);

    const vacation = vacations[0];

    if (!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;

}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validatePost();

    // ImageHandler:
    vacation.imageName = await imageHandler.saveImage(vacation.image);

    const sql = 'INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)'; // TODO select required data

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;

}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validatePut();

    vacation.imageName = await getImageNameFromDB(vacation.vacationId);

    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }

    const sql = `UPDATE vacations SET
    destination = ?,
    description = ?,
    startDate = ?,
    endDate =  ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    delete vacation.image;

    return vacation;
}


// Delete existing vacation:
async function deleteVacation(id: number): Promise<void> {

    // Get image name from database: 
    const imageName = await getImageNameFromDB(id);

    // Delete that image from hard-disk: 
    imageHandler.deleteImage(imageName);

    // Create sql query: 
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, id);

    // If id not exists:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);
}

// Get image name from database: 
async function getImageNameFromDB(id: number): Promise<string> {

    // Create sql query:
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;

    // Get object array:
    const vacations = await dal.execute(sql, id);

    // Extract single product: 
    const vacation = vacations[0];

    // If no such product: 
    if (!vacation) return null;

    // Return image name:
    return vacation.imageName;
}

async function getReports(): Promise<void> {

    const sql = `SELECT * FROM followers`;
    const vacations = await dal.execute(sql);
    return vacations;

}

export default {
    getAllVacationsForAdmin,
    getOneVacationForAdmin,
    addVacation,
    updateVacation,
    deleteVacation,
    getReports
}