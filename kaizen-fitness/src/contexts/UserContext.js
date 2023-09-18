import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [usuarioInfo, setUsuarioInfo] = useState(null);
    
    console.log(usuarioInfo)
    return (
        <UserContext.Provider
            value={{
                usuarioInfo,
                setUsuarioInfo,
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  