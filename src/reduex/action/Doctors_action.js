import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { addAllDoctorsdata, deleteAllDotorsData, getAllDoctorsData, updateAllDoctorsdata } from "../../common/axios/Doctors_api";
import { BASED_URL } from "../../fetch/BasedUrl";
import { db } from "../../firebase";
import * as ActionType from '../ActionType';

export const getDoctorsData = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctors"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({id : doc.id, ... doc.data()})
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(data);
        });
        dispatch({type : ActionType.GET_DOCTORSDATA , payload : data})
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const addDoctorsData = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "Doctors"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionType.ADD_DOCTORSDATA, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(error_doctors(error.message));
    }
}

export const deleteDotorsData = (id) => (dispatch) => {
    try {
        deleteAllDotorsData(id)
            .then(dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: id }))
            .catch((error) => {
                dispatch(error_doctors(error.message));
            });
        // deleteDotorsData
        // fetch(BASED_URL + 'doctors/' + id, {
        //     method: 'DELETE',
        // })
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
        //     .then(dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: id }))
        //     .catch((error) => {
        //         dispatch(error_doctors(error.message));
        //     });
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const updateDotoreData = (data) => (dispatch) => {
    try {
        updateAllDoctorsdata(data)
            .then((data) => {
                dispatch({ type: ActionType.UPDATE_DOCTORSDATA, payload: data.data });
            })
            .catch((error) => {
                dispatch(error_doctors(error.message));
            });
        // fetch(BASED_URL + 'doctors/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
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
        //     .then((data) => {
        //         dispatch({ type: ActionType.UPDATE_DOCTORSDATA, payload: data });
        //     })
        //     .catch((error) => {
        //         dispatch(error_doctors(error.message));
        //     });
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