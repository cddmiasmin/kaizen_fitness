import { createContext, useState, useEffect } from "react";
import { eventControllerGetCalendarConsumerUser, eventControllerGetCalendarProfessionalUser } from "../controller/EventController";
import { userControllerAuth, userControllerHasAProfile } from "../controller/UserController";
import { professionalControllerReadProfile } from "../controller/ProfessionalController";
import { consumerControllerReadProfile } from "../controller/ConsumerController";

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
        kindOfPerson: "PJ",
        latitude: "",
        longitude: "",
        mediaSocial: [],
        name: "Florence",
        photo: "https://i.pinimg.com/564x/e5/40/87/e5408786edbaf21937f2caa40c0173ac.jpg",
        topics: ["Academia"],
        state: "London",
    });
    const [userType, setUserType] = useState('professional');
    const [userCalendar, setUserCalendar] = useState([]);

    const getProfile = async () => {
        let user = {};

        if(userType === 'professional'){
            user = await professionalControllerReadProfile();
        } else {
            user = await consumerControllerReadProfile();
        }

        setUser(user);
    }

    const userHasAProfile = async () => {
        const profile = await userControllerHasAProfile();
        setUser(profile.data);
        setUserType(userData.userType);
    
        console.log('UserContext - Profile', profile);
    
        if(profile.userType === 'consumer') return 'HomeConsumer';
        else if(profile.userType === 'professional') return 'HomeProfessional';
        else return 'CreateProfile';
    }

    const WhatWillBeMyRouteNameNow = async () => {
        const userAuth = await userControllerAuth();

        if(userAuth.emailVerified === false) return 'EmailValidation';
        else {
            const route = await userHasAProfile();
            console.log('UserContext - Route', route);
            return route;
        }
        
    }

    const  getCalendarUser = async () => {
        let events = {};

        if(userType === 'consumer')
            events = await eventControllerGetCalendarConsumerUser();
        else 
            events = await eventControllerGetCalendarProfessionalUser();
        console.log('EVENTS', events);

        setUserCalendar(events);
    }
    
    useEffect(() => {
        if(userData) {
            setUser(userData.data);
            setUserType(userData.userType);
        }
    }, [userData]);

    useEffect(() => {
        if((userType === 'professional' || userType === 'consumer') && user.length !== 0)
            getCalendarUser();
    }, [userType, user]);

    useEffect(() => console.log('UserContext - UserCalendar', userCalendar), [userCalendar]);

    useEffect(() => console.log('UserContext - User', user), [user]);

    return (
        <UserContext.Provider
            value={{
                user, setUser,
                userType, setUserType,
                userCalendar, setUserCalendar,
                getCalendarUser,
                WhatWillBeMyRouteNameNow,
                getProfile
            }}
        >
            {children}
        </UserContext.Provider>
    );

};


  
  