import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { mask, unMask } from 'remask';

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const [data, setData] = useState({});
    const [profileCreated, setProfileCreated] = useState(false);

    const [name, setName] = useState('Evan');
    const [familyName, setFamilyName] = useState('Thomas Peters');
    const [avatar, setAvatar] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1987,0,20));
    const [document, setDocument] = useState('590.148.500-93');
    const [city, setCity] = useState('Saint Louis');
    const [state, setState] = useState('Missouri');
    const [height, setHeight] = useState('1,57');
    const [weight, setWeight] = useState('47,1');
    const [topics, setTopics] = useState(["Academia", "Saúde pública", "Meditação"]);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    const [heightAux, setHeightAux] = useState('1.57');
    const [weightAux, setWeightAux] = useState('47.1');

    const clearData = () => {
        // setData({});
        // setName('');
        // setFamilyName('');
        // setPhoto('');
        // setDateOfBirth('');
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
            const datetime = new Date(user.dateOfBirth);
            setDateOfBirth(datetime.toLocaleDateString('pt-br'));
        }

        if(userType === 'consumer') {
            setHeight(user.height);
            setWeight(user.weight);
            setHeightAux(mask(unMask(user.height), ['9.9', '99.9', '999.9']));
            setWeightAux(mask(unMask(user.weight), ['9.9', '99.9', '999.9']));
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
                dateOfBirth, setDateOfBirth,
                document, setDocument,
                kindOfPerson, setKindOfPerson,
                profileCreated, setProfileCreated,
                topics, setTopics,
                city, setCity,
                state, setState,
                height, setHeight,
                weight, setWeight,
                heightAux, setHeightAux,
                weightAux, setWeightAux
            }}
        >
            {children}
        </DataContext.Provider>
    );

};
