import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const [data, setData] = useState({});

    const [name, setName] = useState('Evan');
    const [familyName, setFamilyName] = useState('Thomas Peters');
    const [photo, setPhoto] = useState('https://i.pinimg.com/564x/d7/28/77/d72877b5a14a034d739b1377f0db68a7.jpg');
    const [dataOfBirth, setDataOfBirth] = useState(new Date(1987,0,20));
    const [document, setDocument] = useState('590.148.500-93');
    const [city, setCity] = useState('Saint Louis');
    const [state, setState] = useState('Missouri');
    const [height, setHeight] = useState('1,80');
    const [weight, setWeight] = useState('79');
    const [topics, setTopics] = useState(["Academia", "Saúde pública", "Meditação"]);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    function timestampToDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000);
        date.setMilliseconds(timestamp.nanoseconds / 1000000);
        return date;
    }

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

            let date = new Date(timestampToDate(user.dataOfBirth));

            setFamilyName(user.familyName);
            setDataOfBirth(date.toLocaleDateString('pt-br'));
        }

        if(userType === 'consumer') {
            setHeight(user.height);
            setWeight(user.weight);
        }

        if(userType === 'professional') setKindOfPerson(user.kindOfPerson);

        setName(user.name);
        setPhoto(user.photo);
        setDocument(user.document);
        setData({});
    }

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
