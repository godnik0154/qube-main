import { SET_USER_INTIALS, RESET_USER_DETAILS } from "./user.types";

const INTIAL_STATE = {
    user: {}
}

const reducer = (state = INTIAL_STATE, action) => {
    switch(action.type){
        case SET_USER_INTIALS:
            return {
                ...state,
                user: action.payload
            }
        case RESET_USER_DETAILS:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
}

export default reducer;