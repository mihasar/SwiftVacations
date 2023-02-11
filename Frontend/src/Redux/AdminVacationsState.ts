import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - Application level state
export class AdminVacationsState {
    public adminVacations: VacationModel[] = [];
}

//2. Action Type - list of actions needed on the data:
export enum AdminVacationsActionType {
    FetchVacation = "FetchVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

//3. Action - a single object describing single operation on the data:
export interface AdminVacationsAction {
    type: AdminVacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}


//4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function): 
export function vacationsReducer(currentState = new AdminVacationsState(), action: AdminVacationsAction): AdminVacationsState {
    const newState = { ...currentState };

    switch (action.type) {

        case AdminVacationsActionType.FetchVacation: // Here the payload is the vacation list fetch by the server
            newState.adminVacations = action.payload;
            break;

        case AdminVacationsActionType.AddVacation:
            newState.adminVacations.push(action.payload); // Here the payload is the added vacation
            break;

        case AdminVacationsActionType.UpdateVacation:
            const indexToUpdate = newState.adminVacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.adminVacations[indexToUpdate] = action.payload;
            }
            break;

        case AdminVacationsActionType.DeleteVacation:
            const indexToDelete = newState.adminVacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.adminVacations.splice(indexToDelete, 1);
            }
            break;

    }

    return newState;
}


//5. Store - Redux manager:
export const adminVacationsStore = createStore(vacationsReducer);

