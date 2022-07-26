import * as ActionType from "../ActionType";


export const getMedicinces = () => (dispatch) => {
    try {
        fetch('http://localhost:3004/Medicices')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.GET_VALUE , payload: data }))
            .catch((error) => console.log(error.message))
    } catch (error) {
        console.log(error);
    }
}