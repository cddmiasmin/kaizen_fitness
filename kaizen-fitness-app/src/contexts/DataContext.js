import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const [data, setData] = useState({});
    const [profileCreated, setProfileCreated] = useState(false);

    const [name, setName] = useState('Evan');
    const [familyName, setFamilyName] = useState('Thomas Peters');
    const [avatar, setAvatar] = useState({});
    const [dataOfBirth, setDataOfBirth] = useState(new Date(1987,0,20));
    const [document, setDocument] = useState('590.148.500-93');
    const [city, setCity] = useState('Saint Louis');
    const [state, setState] = useState('Missouri');
    const [height, setHeight] = useState('1,80');
    const [weight, setWeight] = useState('79');
    const [topics, setTopics] = useState(["Academia", "Saúde pública", "Meditação"]);
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
            setDataOfBirth(new Date(user.dataOfBirth));
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
                profileCreated, setProfileCreated,
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
