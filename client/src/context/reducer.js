import {
    LOCALSTORAGE_INIT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from "./actions";

const reducer = (state, action) => {
    if (action.type === LOCALSTORAGE_INIT) {
        return {
            ...state,
            user: action.payload.user ? JSON.parse(action.payload.user) : null,
            token: action.payload.token,
            userLocation: action.payload.userLocation || "",
            jobLocation: action.payload.userLocation || "",
        };
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.userLoaction,
            jobLocation: action.payload.jobLocation,
            isLoading: false,
        };
    }
    if (action.type === REGISTER_USER_ERROR) {
        console.log("erro do reducer: nao foi possivel registrar usuario");
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    throw new Error(`No such action: ${action.type}`);
};

export default reducer;
