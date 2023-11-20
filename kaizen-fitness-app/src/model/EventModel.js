import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const user = auth().currentUser;

export const eventModelCreate = async (event, professional) => {

    const idUser = user.uid;
    professional.idUser = idUser;
    event.organizer = professional;
  
    const response = await firestore()
                            .collection('Events')
                            .add(event)
                            .then(() => {
                                return { result: true, message: 'Evento cadastrado com sucesso!'}
                            })
                            .catch((error) => {
                                return { result: false, message: error }
                            })
    return response;

}

export const eventModelGetCalendarConsumerUser = async () => {
    const idUser = user.uid;
    console.log(idUser);
    const response = await firestore()
                            .collection("Events")
                            .where("participants", "array-contains", idUser)
                            .get();

    return response;
}

export const eventModelGetCalendarProfessionalUser = async () => {
    const idUser = user.uid;
    const response = await firestore()
                            .collection("Events")
                            .where("organizer.idUser", "==", idUser)
                            .get();

    return response;
}

export const eventModelGetShowcaseForYou = async () => {

}

export const eventModelGetShowcaseRecentlyCreated = async () => {

}

export const eventModelGetShowcaseUpcomingEvents = async (startDate, endDate) => {

    const response = await firestore()
                            .collection("Events")
                            .where(          
                                firestore.Filter.and(
                                    firestore.Filter('datetime', '>=', startDate),
                                    firestore.Filter('datetime', '<=', endDate),
                                )
                            )
                            .get({
                                limit: 15,
                            });
    return response;
}

export const eventModelUpdate = async (event, doc) => {

    const response = await firestore()
                            .collection('Events')
                            .doc(doc)
                            .update(event)
                            .then(() => {
                                return { result: true, message: 'Evento atualizado com sucesso!'}
                            })
                            .catch((error) => {
                                return { result: false, message: error }
                            });
    return response;

}

export const eventModelDelete = async (doc) => {

    const response = await firestore()
                            .collection('Events')
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

export const eventModelDeleteProfessionalUserEvents = async () => {

    const idUser = user.uid;
    const batch = firestore().batch();
   
    const response = await firestore()
                              .collection('Events')
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
                                        .catch(() => { 
                                            return { result: false};
                                        })
                            });
    return response;

}

export const eventModelSearch = async (search) => {

    const response = await firestore()
                            .collection("Events")
                            .where(
                                firestore.Filter.or(
                                    firestore.Filter('name', '==', search),
                                    firestore.Filter('modality', '==', search),
                                    firestore.Filter('organizer.name', '==', search),
                                    firestore.Filter('organizer.familyName', '==', search)
                                )
                            )
                            // .where('name', '==', search)
                            .get();
    return response;

}

export const eventModelSearchByCategory = async (category) => {

    const response = await firestore()
                            .collection("Events")
                            .where('topics', 'array-contains', category)
                            .get({
                                limit: 10,
                            })
    return response;
}