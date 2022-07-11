import { useReducer, createContext, useContext, useEffect } from "react";
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
    LOGOUT_USER,
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
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
            return Promise.reject(error);
        }
    );
    // Response Interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {            
            console.log(error)
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
        removeUserFromLocalStorage()
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
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                registerUser,
                loginUser,
                updateUser,               
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
