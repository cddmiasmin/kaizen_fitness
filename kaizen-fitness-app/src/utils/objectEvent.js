// estrutura do evento na modalidade presencial
const inPersonEvent  = {
    "name": "Evento de Alimentação",
    "datetime": "25/10/2023",
    "topics": ["alimentação"],
    "modality": "presencial",
    "address": "Rua Frei João, 40",
    "latitude": -23.555555,
    "longitude": -46.666667,
    "about": "Este evento é uma apresentação sobre as últimas tendências em alimentação saudável."
}

// estrutura do evento na modalidade on-line 
const onlineEvent = {
    "name": "Evento de Alimentação",
    "datetime": '25/10/2023',
    "topics": ["alimentação"],
    "modality": "on-line",
    "plataform": {      
        name: "Zoom",
        icon: require('../assets/ModalOnlinePlataforms/zoom.png'),
        value: "zoom",
    },
    "meetingLink": "https://jsonformatter.curiousconcept.com/#",
    "about": "Este evento é uma apresentação sobre as últimas tendências em alimentação saudável."
}