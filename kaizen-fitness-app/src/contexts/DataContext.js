import { createContext, useState, useEffect } from "react";

import ProfessionalController from './../controller/ProfessionalController';

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const professionalController = new ProfessionalController();

    const [data, setData] = useState('');

    const [name, setName] = useState('Florence');
    const [familyName, setFamilyName] = useState('Welch');
    const [photo, setPhoto] = useState('https://i.pinimg.com/564x/e5/40/87/e5408786edbaf21937f2caa40c0173ac.jpg');
    const [dataOfBirth, setDataOfBirth] = useState('28/08/1986');
    const [document, setDocument] = useState('123.456.789-00');
    const [city, setCity] = useState('England');
    const [county, setCounty] = useState('');
    const [state, setState] = useState('London');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [services, setServices] = useState(['Treinamento']);
    const [kindOfPerson, setKindOfPerson] = useState('PF');

    useEffect(() => {

        const registerUser = () => {

            if(kindOfPerson === 'PF') {

                setData({
                    "name": name,
                    "familyName": familyName,
                    "photo": photo,
                    "dataOfBirth": dataOfBirth,
                    "state": state,
                    "city": city,
                    "latitude": latitude,
                    "longitude": longitude,
                    "cpf": document,
                    "kindOfPerson": kindOfPerson,
                    "services": services,
                    "mediaSocial": [],
                    "calendar": []
                });

                // setFamilyName(''); setDataOfBirth('');

            }
            else setData({
                "name": name,
                "photo": photo,
                "state": state,
                "city": city,
                "latitude": latitude,
                "longitude": longitude,
                "cnpj": document,
                "kindOfPerson": kindOfPerson,
                "services": services,
                "mediaSocial": [],
                "calendar": []
            });

            // setName(''); setPhoto(''); setState(''); setCity(''); 
            // setDocument(''); setKindOfPerson(''); setServices([]); 
            
            professionalController.registerProfessional(data);
        }

        if(stepNum === 5) registerUser();

    }, [stepNum]);

    return (
        <DataContext.Provider
            value={{
                stepNum, setStepNum,
                name, setName,
                familyName, setFamilyName,
                photo, setPhoto,
                dataOfBirth, setDataOfBirth,
                document, setDocument,
                kindOfPerson, setKindOfPerson,
                services, setServices,
                latitude, setLatitude,
                longitude, setLongitude,
                city, setCity,
                state, setState
            }}
        >
            {children}
        </DataContext.Provider>
    );

};
