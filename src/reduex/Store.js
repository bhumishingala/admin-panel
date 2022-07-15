import { createStore } from "redux";
import { rootCounter } from "./reducer/Index";

export const conFigureStore = () => {
    let store = createStore(rootCounter)    

    return store;
}