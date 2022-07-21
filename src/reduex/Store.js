import { createStore , applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { rootCounter } from "./reducer/Index";

export const conFigureStore = () => {
    let store = createStore(rootCounter,applyMiddleware(thunk))    

    return store;
}