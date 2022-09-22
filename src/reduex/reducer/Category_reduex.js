import * as ActionType from '../ActionType';

const initval = {
    isLoading: false,
    category: '',
    error: ''
}

export const categoryReducer = (state = initval, action) => {
    console.log(action.tyoe, action);
    switch (action.type) {
        case ActionType.GET_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                error: ''
            }
        case ActionType.ADD_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.concat(action.payload),
                error: ''
            }
        case ActionType.ERROR_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: [],
                error: action.payload
            }
        case ActionType.DETETE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((f) => f.id !== action.payload),
                error: ''
            }
        case ActionType.UPDATE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((cat) => {
                    if (cat.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return cat;
                    }
                })
            }
        default:
            return state
    }
}