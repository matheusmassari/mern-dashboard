import {
    useReducer,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import reducer from "./reducer";
import axios from "axios";
import {
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOCALSTORAGE_INIT,
    CLEAR_ALERT,
    CLEAR_VALUES,
    LOGOUT_USER,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
} from "./actions";

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    userLocation: "",
    // Job block
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["Full-time", "Part-time", "Remote", "Internship"],
    jobType: "full-time",
    jobLocation: "",
    statusOptions: ["Interview", "Declined", "Pending"],
    status: "pending",
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [userLoading, setUserLoading] = useState(true);

    // -----------------------------------------> Axios Setup
    // Axios Custom Instance
    const authFetch = axios.create({
        baseURL: "http://localhost:4000/api/v1",
    });
    // Request Interceptor
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            console.log(error);
            logoutUser();
            return Promise.reject(error);
        }
    );
    // Response Interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error);
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );
    // -----------------------------------------> Axios Setup End

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/auth/register",
                currentUser
            );
            console.log(response);
            const { user, token, location } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location },
            });
            addUserToLocalStorage({ user, token, location });
            // setItem("user", { user, token, location });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const response = await axios.post(
                "http://localhost:4000/api/v1/auth/login",
                currentUser
            );
            console.log(response);
            const { user, token, location } = response.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location },
            });
            // setItem({ user, token, location });
            addUserToLocalStorage({ user, token, location });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch(
                "/auth/updateUser",
                currentUser
            );
            const { user, location, token } = data;
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token },
            });
            addUserToLocalStorage({ user, location, token });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("location");
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const createJob = async (data) => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
            const { user } = state;
            const { position, company, jobLocation, jobType, status } = data;
            await authFetch.post("jobs", {
                position,
                company,
                jobLocation,
                jobType,
                status,
                userId: user._id,
            });
            dispatch({ type: CREATE_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            console.log(error);
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const getJobs = async () => {
        let url = `/jobs`;
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await authFetch(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, totalJobs, numOfPages },
            });
        } catch (error) {
            console.log(error);
            logoutUser();
        }
    };

    // const getJobs = async () => {
    //     let url = `http://localhost:4000/api/v1/jobs`;
    //     dispatch({ type: GET_JOBS_BEGIN });
    //     try {
    //         const { data } = await axios(url, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${state.token}`,
    //             },
    //         });
    //         const { jobs, totalJobs, numOfPages } = data;
    //         dispatch({
    //             type: GET_JOBS_SUCCESS,
    //             payload: { jobs, totalJobs, numOfPages },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // Local Storage Inicialização

    useEffect(() => {
        // const user = getItem("user");
        // const token = getItem("token");
        // const userLocation = getItem("location");
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const userLocation = localStorage.getItem("location");
        dispatch({
            type: LOCALSTORAGE_INIT,
            payload: {
                token,
                user,
                userLocation,
            },
        });
        setUserLoading(false);
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                registerUser,
                loginUser,
                logoutUser,
                updateUser,
                createJob,
                getJobs,
                userLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
