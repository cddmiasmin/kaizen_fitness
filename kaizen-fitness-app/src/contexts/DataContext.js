import { createContext, useState, useEffect, useContext } from "react";

import ProfessionalController from './../controller/ProfessionalController';
import { createJsonObject } from "../utils/createJsonObject";
import { UserContext } from "./UserContext";

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const professionalController = new ProfessionalController();

    const [data, setData] = useState({});

    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('Welch');
    const [photo, setPhoto] = useState('https://i.pinimg.com/564x/e5/40/87/e5408786edbaf21937f2caa40c0173ac.jpg');
    const [dataOfBirth, setDataOfBirth] = useState(new Date());
    const [document, setDocument] = useState('123.456.789-00');
    const [city, setCity] = useState('England');
    const [county, setCounty] = useState('');
    const [state, setState] = useState('London');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [topics, setTopics] = useState([]);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    const clearData = () => {
        // setData({});
        // setName('');
        // setFamilyName('');
        // setPhoto('');
        // setDataOfBirth('');
        // setDocument('');
        // setCity('');
        // setCounty('');
        // setState('');
        // setLatitude('');
        // setLongitude('');
        // setHeight('');
        // setWeight('');
        // setTopics([]);
        // setKindOfPerson('');
        console.log('oi');
    };

    const myData = () => {
        if(userType === 'consumer' || user.kindOfPerson === 'PF') {
            setFamilyName(user.familyName);
            setDataOfBirth(user.dataOfBirth);
        }

        if(userType === 'consumer') {
            setHeight(user.height);
            setWeight(user.weight);
        }

        if(userType === 'professional') setKindOfPerson(user.kindOfPerson);

        setName(user.name);
        setPhoto(user.photo);
        setDocument(user.document);

        console.log('oio');
    }

    useEffect(() => {
        if(stepNum === 5) console.log('a paz', data)
    }, [stepNum]);

    useEffect(() => {
        // if(Object.keys(data).length > 0) {
        //     console.log("Register", data, typeof data);
        //     professionalController.registerProfessional(data);
        // }
        console.log('data', data);
    }, [data]);

    return (
        <DataContext.Provider
            value={{
                data, setData, 
                clearData, myData,
                stepNum, setStepNum,
                name, setName,
                familyName, setFamilyName,
                photo, setPhoto,
                dataOfBirth, setDataOfBirth,
                document, setDocument,
                kindOfPerson, setKindOfPerson,
                topics, setTopics,
                latitude, setLatitude,
                longitude, setLongitude,
                city, setCity,
                state, setState,
                height, setHeight,
                weight, setWeight
            }}
        >
            {children}
        </DataContext.Provider>
    );

};
