import { createContext, useState, useEffect } from "react";
import { 
    eventControllerGetCalendarConsumerUser, 
    eventControllerGetCalendarProfessionalUser 
} from "../controller/EventController";
import { userControllerAuth, userControllerHasAProfile } from "../controller/UserController";
import { professionalControllerReadProfile } from "../controller/ProfessionalController";
import { consumerControllerReadProfile } from "../controller/ConsumerController";

export const UserContext = createContext();

export const UserContextProvider = ({ userData , children }) => {

    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState('noProfile');
    const [userCalendar, setUserCalendar] = useState(null);

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

        console.log('UserContext', userType)
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


  
  