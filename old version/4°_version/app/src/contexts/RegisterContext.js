import { createContext, useState, useEffect } from "react";
import ProfessionalController from "../Controllers/ProfessionalController";
import firestore from '@react-native-firebase/firestore';

export const RegisterContext = createContext();

export const RegisterContextProvider = ({ stepNum, setStepNum, children }) => {

    const professionalController = new ProfessionalController();

    const availableServices = [
        'florence welch',
        'taylor swift',
        'demimetria',
        'iasmin',
        'jessica',
        'franklin',
        'girl',
        'ravena',
        'hoo',
        'flamengo',
        'britney',
    ];

    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [photo, setPhoto] = useState('');
    const [dataOfBirth, setDataOfBirth] = useState('');
    const [document, setDocument] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [services, setServices] = useState([]);
    const [socialMedia, SetSocialMedia] = useState([]);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    useEffect(() => {
        const text = async () => {
            const usersCollection = await firestore().collection('UserProfessional').doc('ABC').get();
            console.log(usersCollection);
        }

        text()
        // if(stepNum === 5) {
        //     // var dataProfessional;

        //     // if(kindOfPerson === 'PF') 
        //     //     dataProfessional = {
        //     //         "name": name,
        //     //         "familyName": familyName,
        //     //         "photo": photo,
        //     //         "dataOfBirth": dataOfBirth,
        //     //         "email": "",
        //     //         "verifiedEmail": "",
        //     //         "state": state,
        //     //         "city": city,
        //     //         "latitude": latitude,
        //     //         "longitude": longitude,
        //     //         "cpf": document,
        //     //         "kindOfPerson": kindOfPerson,
        //     //         "Services": services,
        //     //         "mediaSocial": [],
        //     //         "calendar": []
        //     //     }
        //     // else dataProfessional = {
        //     //     "name": name,
        //     //     "photo": photo,
        //     //     "email": "",
        //     //     "verifiedEmail": "",
        //     //     "state": state,
        //     //     "city": city,
        //     //     "latitude": latitude,
        //     //     "longitude": longitude,
        //     //     "cnpj": document,
        //     //     "kindOfPerson": kindOfPerson,
        //     //     "Services": services,
        //     //     "mediaSocial": [],
        //     //     "calendar": []
        //     // }

        //     // professionalController.createProfessional(dataProfessional);
        //     console.log('oi')

        // }

        // firestore()
        // .collection('UserProfessional')
        // .add({
        //   name: 'Ada Lovelace',
        //   age: 30,
        // })
        // .then(() => {
        //     console.log('User added!');
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

    },[]);

    return (
        <RegisterContext.Provider
            value={{
                stepNum, setStepNum,
                name, setName,
                familyName, setFamilyName,
                photo, setPhoto,
                dataOfBirth, setDataOfBirth,
                document, setDocument,
                kindOfPerson, setKindOfPerson,
                availableServices,
                services, setServices,
                latitude, setLatitude,
                longitude, setLongitude,
                city, setCity,
                state, setState
            }}
        >
            {children}
        </RegisterContext.Provider>
    );

};
