import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const consumerAuth = auth().currentUser;

export const consumerModelCreateProfile = async (consumer) => {
    
    const idUser = consumerAuth.uid;
    const emailUser = consumerAuth.email;

    consumer.emailUser = emailUser;

    const response = await firestore()
                            .collection('ConsumerUsers')
                            .doc(idUser)
                            .set(consumer)
                            .then(() => {
                                return { result: true, message: 'Perfil consumidor criado com sucesso!'}
                            })
                            .catch((error) => {
                                return { result: false, message: error }
                            });

    return response;

}

export const consumerModelReadProfile = async () => {

    const idUser = consumerAuth.uid;
    const response = await firestore()
                            .collection('ConsumerUsers')
                            .doc(idUser)
                            .get();
    return response;
}

export const consumerModelUpdateProfile = async (consumer) => {

    const idUser = consumerAuth.uid;
    const response = await firestore()
                            .collection('ConsumerUsers')
                            .doc(idUser)
                            .update(consumer)
                            .then(() => {
                                return { result: true, message: 'Dados atualizados com sucesso!'}
                            })
                            .catch((error) => {
                                return { result: false, message: error }
                            });
    return response;
}

export const consumerModelDeleteProfile = async () => {
    
}