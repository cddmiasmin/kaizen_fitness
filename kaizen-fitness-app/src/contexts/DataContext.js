import { createContext, useState, useEffect } from "react";

import ProfessionalController from './../controller/ProfessionalController';

export const DataContext = createContext();

export const DataContextProvider = ({ stepNum, setStepNum, children }) => {

    const professionalController = new ProfessionalController();

    const availableServices = [
        "Nutrição e Dieta", "Treinamento", "Atividade Física", "Esporte", 
        "Fisioterapia", "Reabilitação", "Massagem", "Coaching", "Psicologia", 
        "Yoga", "Meditação", "Quiropraxia", "Manipulação Corporal", "Terapia Ocupacional", 
        "Acupuntura", "Medicina Alternativa", "Estética"
    ];

    const [data, setData] = useState('');

    const [name, setName] = useState('Taylor');
    const [familyName, setFamilyName] = useState('Swift');
    const [photo, setPhoto] = useState('https://i.pinimg.com/564x/f6/4b/52/f64b529d5c5c5c33a149ce3e22f70709.jpg');
    const [dataOfBirth, setDataOfBirth] = useState('13/12/1989');
    const [document, setDocument] = useState('123.456.789-00');
    const [city, setCity] = useState('SP');
    const [county, setCounty] = useState('');
    const [state, setState] = useState('SP');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [services, setServices] = useState([]);
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
                availableServices,
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
