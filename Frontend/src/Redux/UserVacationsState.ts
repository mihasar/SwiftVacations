import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - Application level state
export class UserVacationsState {
    public userVacations: VacationModel[] = [];
}

//2. Action Type - list of actions needed on the data:
export enum UserVacationsActionType {
    FetchUserVacation = "FetchUserVacation",
    follow = "follow",
    unfollow = "unfollow",
    RemoveFollow = "RemoveFollow",
}

//3. Action - a single object describing single operation on the data:
export interface VacationsAction {
    type: UserVacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}


//4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function): 
export function vacationsReducer(currentState = new UserVacationsState(), action: VacationsAction): UserVacationsState {
    const newState = { ...currentState };
    console.log(action)

    switch (action.type) {

        case UserVacationsActionType.FetchUserVacation: // Here the payload is the product list fetch by the server
            newState.userVacations = action.payload;
            break;

        case UserVacationsActionType.follow:
            const isNotFollowingToUpdate = newState.userVacations.find(v => v.vacationId === action.payload)
            isNotFollowingToUpdate.idFollowing = 1;
            isNotFollowingToUpdate.followersCount += 1
            break;

        case UserVacationsActionType.unfollow:
            const isFollowingToUpdate = newState.userVacations.find(v => v.vacationId === action.payload)
            if (isFollowingToUpdate.idFollowing === 1) {
                isFollowingToUpdate.idFollowing = 0;
            }
            break;

        case UserVacationsActionType.RemoveFollow:
            const removeFollowerVacation = newState.userVacations.find(v => v.vacationId === action.payload)
            removeFollowerVacation.followersCount -= 1;
            break;
    }


    return newState;
}


//5. Store - Redux manager:
export const userVacationsStore = createStore(vacationsReducer);

