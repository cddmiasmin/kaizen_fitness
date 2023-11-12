import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ userData , children }) => {

    const [user, setUser] = useState({
        searchHistory: [
            { search: 'como perder peso', datatime: new Date(2023, 10, 6, 10, 13) },
            { search: 'caminhada', datatime: new Date(2023, 2, 15, 10, 13) },
            { search: 'emagrecer', datatime: new Date(2023, 10, 6, 10, 13) },
            { search: 'alimentacao', datatime: new Date(2023, 5, 6, 10, 13) },
        ],
        city: "England",
        document: "123.456.789-00",
        dataOfBirth: "18",
        emailUser: "Florence.welch@hotmail.com",
        emailVerified: false,
        familyName: "Welch",
        kindOfPerson: "PF",
        latitude: "",
        longitude: "",
        mediaSocial: [],
        name: "Florence",
        photo: "https://i.pinimg.com/564x/e5/40/87/e5408786edbaf21937f2caa40c0173ac.jpg",
        topics: ["Academia"],
        state: "London",
      });
    const [userType, setUserType] = useState('professional');
    
    useEffect(() => {
        if(userData) {
            setUser(userData.data);
            setUserType(userData.userType)
        }
    }, [userData]);

    //console.log('UserContext', user, user.dataOfBirth );

    // useEffect(() => {
    //     function timestampToDate(timestamp) {
    //         const date = new Date(timestamp.seconds * 1000);
    //         date.setMilliseconds(timestamp.nanoseconds / 1000000);
    //         return date;
    //     }

    //     const date = new Date(timestampToDate(user.dataOfBirth))

    //     console.log(user.dataOfBirth, date)
    // }, [user])

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


  
  