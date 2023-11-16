import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const [data, setData] = useState({});

    const [name, setName] = useState('Evan');
    const [familyName, setFamilyName] = useState('Thomas Peters');
    const [avatar, setAvatar] = useState([]);
    const [dataOfBirth, setDataOfBirth] = useState(new Date(1987,0,20));
    const [document, setDocument] = useState('590.148.500-93');
    const [city, setCity] = useState('Saint Louis');
    const [state, setState] = useState('Missouri');
    const [height, setHeight] = useState('1,80');
    const [weight, setWeight] = useState('79');
    const [topics, setTopics] = useState(["Academia", "Saúde pública", "Meditação"]);
    const [kindOfPerson, setKindOfPerson] = useState('PJ');

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
        setAvatar(user.avatar);
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
                avatar, setAvatar,
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
