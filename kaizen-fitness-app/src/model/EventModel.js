import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class EventModel {
    
    addEvent = async (event, professional) => {
        const idUser = await auth().currentUser.uid;

        professional.idUser = idUser;
      
        event.organizer = professional;
      
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
                                  .where("organizer.idUser", "==", idUser)
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

    getSearch = async ( search ) => {

        const response = await firestore()
        .collection("ProfessionalEvent")
        .where(
          firestore.Filter.or(
            firestore.Filter('name', '==', search),
            firestore.Filter('modality', '==', search),
            firestore.Filter('organizer.name', '==', search),
            firestore.Filter('organizer.familyName', '==', search)
          )
        )
        .get({
          limit: 10,
        })

        return response;
    }

    getCategory = async (category) => {

        const response = await firestore()
        .collection("ProfessionalEvent")
        .where('topics', 'array-contains', category)
        .get({
          limit: 10,
        })

        return response;
    }

    getUpcomingEvents = async () => {

        var nowDate = new Date(Date.now());
        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setMilliseconds(0);
      
        var date = new Date();
        date.setDate(nowDate.getDate() + 14);
        date.setHours(23);
        date.setMinutes(59);
        date.setMilliseconds(0);
      
        const response = await firestore()
                                .collection("ProfessionalEvent")
                                .where(          
                                  firestore.Filter.and(
                                    firestore.Filter('datetime', '>=', nowDate),
                                    firestore.Filter('datetime', '<=', date),
                                  )
                                )
                                .get({
                                  limit: 10,
                                })

        return response;
    }

    getNearbyEvents = async () => {

        var nowDate = new Date(Date.now());

        var date = new Date();
        date.setDate(nowDate.getDate() + 15);
        date.setHours(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
      
        const response = await firestore()
                                .collection("ProfessionalEvent")
                                .where(          
                                    firestore.Filter('datetime', '>=', date), 
                                )
                                .get({
                                  limit: 10,
                                })
        return response;
    }

}

export default EventModel;