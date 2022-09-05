import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import * as ActionType from '../ActionType';

export const getDoctorsData = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Doctors"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(data);
        });
        dispatch({ type: ActionType.GET_DOCTORSDATA, payload: data })
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

export const deleteDotorsData = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "Doctors", id));
        console.log(id);
        dispatch({ type: ActionType.DELETE_DOCTORSDATA, payload: id })
    } catch (error) {
        dispatch(error_doctors(error.message))
    }
}

export const updateDotoreData = (data) => async(dispatch) => {
    try {
        const DoctorsRef = doc(db, "Doctors", data.id);
        await updateDoc(DoctorsRef, {
            name : data.name,
            email : data.email,
            phone : data.phone
        });
        dispatch({type : ActionType.UPDATE_DOCTORSDATA , payload : data})
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