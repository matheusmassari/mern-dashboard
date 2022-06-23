import { useReducer, createContext, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOCALSTORAGE_INIT,
} from "./actions";

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    userLocation: "",
    jobLocation: "",
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    };

    const removeUserFromLocalStorage = ({}) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("location");
    };

    // Local Storage Inicialização
    useEffect(() => {        
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const userLocation = localStorage.getItem("location");
        dispatch({
            type: LOCALSTORAGE_INIT,
            payload: { token, user, userLocation },
        });
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                registerUser,
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
