import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ userAux , children }) => {

    const [user, setUser] = useState({});
    const [userType, setUserType] = useState('consumer');

    console.log('User - I', user, userType);

    useEffect(() => {
        if(userAux) {
            if(userAux.data) setUser(userAux.data);
            //if(userAux.userType) setUserType(userAux.userType);
        }
    }, [userAux]);

    console.log('User - F', user, userType);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userType,
                setUserType
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  