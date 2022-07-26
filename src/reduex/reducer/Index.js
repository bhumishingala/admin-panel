import { combineReducers } from "redux";
import { counterReduex } from "./Counter_reduex";
import { medicincesReduex } from "./Medicinces_reduex";


export const rootCounter = combineReducers ({
    counter : counterReduex,
    medicinces : medicincesReduex,
})