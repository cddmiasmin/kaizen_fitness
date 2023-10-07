import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ userAux , children }) => {

    const [user, setUser] = useState({
        calendar: [],
        city: "England",
        document: "123.456.789-00",
        dataOfBirth: "28/08/1986",
        emailUser: "Florence.welch@hotmail.com",
        emailVerified: false,
        familyName: "Welch",
        kindOfPerson: "PJ",
        latitude: "",
        longitude: "",
        mediaSocial: [],
        name: "Florence",
        photo: "https://i.pinimg.com/564x/e5/40/87/e5408786edbaf21937f2caa40c0173ac.jpg",
        topics: ["Treinamento","Medicina Alternativa"],
        state: "London",
      });
    const [userType, setUserType] = useState('consumer');

    console.log('User - I', user, userType);

    // useEffect(() => {
    //     if(userAux){
    //         if(userAux.data) setUser(userAux.data);
    //         if(userAux.userType) setUserType(userAux.userType);
    //     }
    // }, [userAux]);

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


  
  