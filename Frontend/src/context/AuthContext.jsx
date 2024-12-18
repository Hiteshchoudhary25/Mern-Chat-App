import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    // const [authUser, setAuthUser] = useState(() => {
    //     const user = localStorage.getItem("chat-user");
    //     return user ? JSON.parse(user) : null;
    // });
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
