import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class EventModel {

    addEvent = async () => {
        firestore()
        .collection('professionalEvent')
        .add({
            "id": 1234567890,
            "nome": "Palestra sobre JavaScript",
            "descricao": "Uma palestra sobre os fundamentos da linguagem JavaScript",
            "data": "2023-10-04T03:06:03-03:00",
            "hora": "19:00",
            "local": "São Paulo, Brasil",
            "organizador": "Bard",
            "participantes": [
              {
                "nome": "Fulano de Tal",
                "email": "fulano@email.com"
              },
              {
                "nome": "Beltrano de Tal",
                "email": "beltrano@email.com"
              }
            ]
        })
        .then(() => {
            console.log('User added!');
        });
    }

    deleteProfessionalEvent = async () => {
        const idUser = await auth().currentUser.uid;
        const batch = firestore().batch();
       
            firestore()
            .collection('professionalEvent')
            .where('idUser', '==', idUser)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
              });
        
              batch.commit().then(() => {
                console.log('All users deleted!');
              });
        });

    }
}

export default EventModel;