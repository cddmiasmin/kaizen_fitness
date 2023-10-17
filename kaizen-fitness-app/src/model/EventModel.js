import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class EventModel {
    
    addEvent = async (event, professional) => {
        const idUser = await auth().currentUser.uid;

        professional.idUser = idUser;
      
        event.professional = professional;
      
        const response = await firestore()
                                .collection('ProfessionalEvent')
                                .add(event)
                                .then(() => {
                                    return { result: true, message: 'Evento cadastrado com sucesso!'}
                                })
                                .catch((error) => {
                                    return { result: false, message: error }
                                })
      
        return response;
    }

    updateEvent = async (event, doc) => {

        const response = await firestore()
                                .collection('ProfessionalEvent')
                                .doc(doc)
                                .update(event)
                                .then(() => {
                                    return { result: true, message: 'Evento atualizado com sucesso!'}
                                })
                                .catch((error) => {
                                    return { result: false, message: error }
                                })

        return response;
    }

    deleteEvent = async (doc) => {
        const response = await firestore()
                                .collection('ProfessionalEvent')
                                .doc(doc)
                                .delete()
                                .then(() => { 
                                    return { result: true, message: 'Evento removido com sucesso!'}
                                })
                                .catch((error) => {
                                    return { result: false, message: error }
                                });
        return response;
    }

    deleteProfessionalEvents = async () => {
        const idUser = await auth().currentUser.uid;
        const batch = firestore().batch();
       
        const response = await firestore()
                                  .collection('ProfessionalEvent')
                                  .where("professional.idUser", "==", idUser)
                                  .get()
                                  .then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            batch.delete(doc.ref);
                                        });
                                
                                        batch.commit()
                                            .then(() => {
                                                return { result: true};
                                            })
                                            .catch((error) => { 
                                                return { result: false};
                                            })
                                  });
        return response;
    }


}

export default EventModel;