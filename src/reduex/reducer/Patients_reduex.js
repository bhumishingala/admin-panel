import * as ActionType from '../ActionType';

const intival = {
    isLoading : false,
    patients : [ ],
    error : ''
}

export const Patientsreduex = (state = intival,action) => {
    console.log(state,action);
    switch(action.type){
        case ActionType.GET_PATIENTSDATA :
            return {
                ...state,
                isLoading : false,
                patients : action.payload,
                error : ''
            }
        case ActionType.LOADING_PATIENTS :
            return {
                ...state,
                isLoading : true,
                error : ''
            }
        case ActionType.ERROR_PATIENTS :
            return {
                ...state,
                isLoading : false,
                patients : [],
                error : action.payload
            }
        default :
            return state;
    }
}