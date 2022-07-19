import {
    LOCALSTORAGE_INIT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    CLEAR_ALERT,
    CLEAR_VALUES,
    LOGOUT_USER,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
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
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editJobId: "",
            position: "",
            company: "",
            jobLocation: state.userLocation,
            jobType: "Full-time",
            status: "Pending",
        };
        return {
            ...state,
            ...initialState,
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
            jobLocation: action.payload.userLocation,
            isLoading: false,
        };
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
        };
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            isLoading: false,
            showAlert: false,
            alertText: "",
            alertType: "",
            user: null,
            token: null,
            userLocation: "",
            jobLocation: "",
        };
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertText: "User Profile Updated.",
        };
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    if (action.type === CREATE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true,
        };
    }
    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "New Job Created",
        };
    }
    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }
    if (action.type === GET_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        };
    }
    if (action.type === GET_JOBS_SUCCESS) {
        
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages,
        };
    }
    throw new Error(`No such action: ${action.type}`);
};

export default reducer;
