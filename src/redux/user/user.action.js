import { SET_USER_INTIALS, RESET_USER_DETAILS } from "./user.types";

export const setUserDetails  = (payload) => ({
    type: SET_USER_INTIALS,
    payload
})

export const resetUserDetails = () => ({
    type: RESET_USER_DETAILS
})