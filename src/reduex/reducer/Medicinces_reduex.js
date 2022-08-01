import * as ActionType from "../ActionType";

const initval = {
    isLoading : false,
    medicinces : [],
    error :''
}

export const medicincesReduex = (state = initval,action) => {
    console.log(state,action);
    switch(action.type){
        case ActionType.GET_VALUE :
            return{
                ...state,
                isLoading : false,
                medicinces : action.payload,
                error : ''
            }
        case ActionType.ADD_MEDICINCES :
            return {
                ...state,
                isLoading : false,
                medicinces : state.medicinces.concat(action.payload), 
                error : ''
            }
        case ActionType.LOADING_MEDICINCES :
            return {
                ...state,
                isLoading : true,
                error : ''
            }
        case ActionType.ERROR_MEDICINCES :
            return {
                ...state,
                isLoading : false,
                medicinces : [],
                error : action.payload
            }
        default :
            return state;
    }
}