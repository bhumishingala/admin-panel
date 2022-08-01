import { BASED_URL } from "../../fetch/BasedUrl";
import * as ActionType from "../ActionType";


export const getMedicinces = () => (dispatch) => {
    try {
        dispatch(LoadingMedicinces());

        setTimeout(function () {
            fetch(BASED_URL + 'Medicices')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: ActionType.GET_VALUE, payload: data }))
                .catch((error) => dispatch(errorMedicinces(error.message)));
        }, 2000);
    } catch (error) {
        dispatch(errorMedicinces(error.message))
    }
}

export const addMedicinces = (data) => (dispatch) => {
    try {
        fetch(BASED_URL + "Medicices", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({type : ActionType.ADD_MEDICINCES,payload : data});
            })
            .catch((error) => {
                dispatch(errorMedicinces(error.message));
            });
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }
}

export const LoadingMedicinces = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_MEDICINCES });
}

export const errorMedicinces = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_MEDICINCES, payload: error });
}

