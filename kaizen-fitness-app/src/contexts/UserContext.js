import { createContext, useState, useEffect } from "react";
import { eventControllerGetCalendarConsumerUser, eventControllerGetCalendarProfessionalUser } from "../controller/EventController";

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
        dataOfBirth: "24/03/2022",
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
    const [userType, setUserType] = useState('consumer');
    const [userCalendar, setUserCalendar] = useState([]);

    const  getCalendarUser = async () => {
        let events = {};

        if(userType === 'consumer')
            events = await eventControllerGetCalendarConsumerUser();
        else 
            events = await eventControllerGetCalendarProfessionalUser();
        console.log('EVENTS', events)

        setUserCalendar(events);
    }
    
    useEffect(() => {
        if(userData) {
            // setUser(userData.data);
            setUserType(userData.userType);
            //setUserType('consumer')
        }
    }, [userData]);

    //console.log('UserContext', user, user.dataOfBirth );

    useEffect(() => {
        if(userType === 'professional' || userType === 'consumer')
            getCalendarUser();
    }, [userType]);

    useEffect(() => console.log(userCalendar), []);

    return (
        <UserContext.Provider
            value={{
                user, setUser,
                userType, setUserType,
                userCalendar, setUserCalendar,
                getCalendarUser
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  