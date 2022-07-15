import { combineReducers } from "redux";
import { counterReduex } from "./Counter_reduex";


export const rootCounter = combineReducers ({
    counter : counterReduex
})