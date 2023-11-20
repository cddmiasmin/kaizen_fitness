import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { mask, unMask } from 'remask';

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const { user, userType } = useContext(UserContext);

    const [data, setData] = useState({});
    const [profileCreated, setProfileCreated] = useState(false);

    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [avatar, setAvatar] = useState([]);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [document, setDocument] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [topics, setTopics] = useState([]);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    const [heightAux, setHeightAux] = useState('');
    const [weightAux, setWeightAux] = useState('');

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
