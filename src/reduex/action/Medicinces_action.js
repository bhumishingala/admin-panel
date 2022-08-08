import { getAllMedicinces } from "../../common/axios/Medicinces_api";
import { BASED_URL } from "../../fetch/BasedUrl";
import * as ActionType from "../ActionType";


export const getMedicinces = () => (dispatch) => {
    try {
        dispatch(LoadingMedicinces());

        setTimeout(function () {
            getAllMedicinces()
                .then((data) => dispatch({ type: ActionType.GET_VALUE, payload: data.data }))
                .catch((error) => dispatch(errorMedicinces(error.message)))
            // fetch(BASED_URL + 'Medicices')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: ActionType.GET_VALUE, payload: data }))
            //     .catch((error) => dispatch(errorMedicinces(error.message)));
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
            body: JSON.stringify(data)
        })
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
            .then((data) => {
                dispatch({ type: ActionType.ADD_MEDICINCES, payload: data });
            })
            .catch((error) => {
                dispatch(errorMedicinces(error.message));
            });
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }
}

export const deleteMedicinces = (id) => (dispatch) => {
    try {
        fetch(BASED_URL + "Medicices/" + id, {
            method: 'DELETE'
        })
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
            .then(dispatch({ type: ActionType.DELETE_MEDICINCES, payload: id }))
    } catch (error) {
        dispatch(errorMedicinces(error.message));
    }
    console.log(id);
}

export const updateMedicinces = (data) => (dispatch) => {
    console.log(data);
    try {
        fetch(BASED_URL + "Medicices/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
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
            .then((data) => {
                dispatch({ type: ActionType.UPDATE_MEDICINCES, payload: data })
                console.log(data);
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

