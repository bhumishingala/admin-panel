import { BASED_URL } from "../../fetch/BasedUrl";
import * as ActionType from '../ActionType';

export const getDoctorsData = () => (dispatch) => {
    dispatch(loading_doctors());
    try {
        setTimeout(function () {
            fetch(BASED_URL + 'doctors')
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
                .then((data) => dispatch({ type: ActionType.GET_DOCTORSDATA, payload: data }))
                .catch((error) => dispatch(error_doctors(error.message)))
        }, 2000);
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const addDoctorsData = (data) => (dispatch) => {
    try {
        fetch(BASED_URL + "doctors", {
            method: "POST",
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
                dispatch({ type: ActionType.ADD_DOCTORSDATA, payload: data });
            })
            .catch((error) => {
                dispatch(error_doctors(error.message));
            });
    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const deleteDotorsData = (id) => (dispatch) => {
    try {
        fetch(BASED_URL + 'doctors/' + id, {
            method: 'DELETE',
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
            .then(dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: id }))
            .catch((error) => {
                dispatch(error_doctors(error.message));
            });
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const updateDotoreData = (data) => (dispatch) => {
    try {
        fetch(BASED_URL + 'doctors/' + data.id, {
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
                dispatch({ type: ActionType.UPDATE_DOCTORSDATA, payload: data });
            })
            .catch((error) => {
                dispatch(error_doctors(error.message));
            });
    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const loading_doctors = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTORSDATA })
}

export const error_doctors = (error) => (dispatch) => {
    dispatch({ type: ActionType.ERROR_DOCTORSDATA, payload: error })
}