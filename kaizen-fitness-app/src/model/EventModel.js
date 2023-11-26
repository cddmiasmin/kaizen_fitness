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

export const eventModelGetShowcaseForYou = async (currentDate, topics) => {
    const response = await firestore()
                            .collection("Events")
                            .where(          
                                firestore.Filter.and(
                                    firestore.Filter('topics', 'array-contains-any', topics),
                                    firestore.Filter('datetime', '>', currentDate)
                                )
                            )
                            .orderBy("datetime", "asc")
                            .limit(20)
                            .get();
    return response;
}

export const eventModelGetShowcaseRecentlyCreated = async () => {

    const response = await firestore()
                            .collection("Events")
                            .orderBy("created", "desc")
                            .orderBy("datetime", "asc")
                            .limit(20)
                            .get();
    return response;
}

export const eventModelGetShowcaseUpcomingEvents = async (startDate) => {

    const response = await firestore()
                            .collection("Events")
                            .where('datetime', '>=', startDate)
                            .orderBy("datetime", "asc")
                            .limit(20)
                            .get();
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
                                            return { result: true };
                                        })
                                        .catch(() => { 
                                            return { result: false };
                                        })
                            });
    return response;

}

export const eventModelRemoveConsumerUserEvents = async () => {

    const idUser = 'OPlh5LL4uFd9mU32uLjCkuQ7jrf1';
    const batch = firestore().batch();
   
    const response = await firestore()
        .collection('Events')
        .where("participants", "array-contains", idUser)
        .get()
        .then(async (querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                let participantsAux = doc.data().participants.filter(participant => participant !== idUser);
                batch.update(doc.ref, {
                    participants: participantsAux
                });
            });
            
            return await batch.commit();            
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