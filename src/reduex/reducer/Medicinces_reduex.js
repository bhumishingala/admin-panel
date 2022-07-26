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
        default :
            return state;
    }
}