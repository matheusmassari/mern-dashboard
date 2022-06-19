import { useReducer, createContext, useContext } from "react";
import reducer from "./reducer";

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{
                ...state,
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
