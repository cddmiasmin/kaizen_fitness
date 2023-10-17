import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class ProfessionalModal {

    registerProfessional = async ( professional ) => {

        const idUser = await auth().currentUser.uid;
        const emailUser = await auth().currentUser.email;
        const emailVerified = await auth().currentUser.emailVerified;

        professional.emailUser = emailUser;
        professional.emailVerified = emailVerified;

        const response = await firestore()
                                    .collection('UserProfessional')
                                    .doc(idUser)
                                    .set(professional)
                                    .then(() => {
                                        return { result: true, message: 'Dados salvos com sucesso!'}
                                    })
                                    .catch((error) => {
                                        return { result: false, message: error }
                                    })

        return response;
    }

    getProfessional = async ( idUser ) => {
        const professional = await firestore().collection('UserProfessional').doc(idUser).get();
        return professional;
    }

    deleteProfessional = async () => {
        const idUser = await auth().currentUser.uid;

        const response = await firestore()
                                .collection('UserProfessional')
                                .doc(idUser)
                                .delete()
                                .then(() => {
                                    return { result: true, message: 'Conta removida!'}
                                })
                                .catch((error) => {
                                    return { result: false, message: error }
                                });
        
        return response;
    }

    updateProfessional = async (professional) => {

        const idUser = await auth().currentUser.uid;

        const response = await firestore()
                                    .collection('UserProfessional')
                                    .doc(idUser)
                                    .update(professional)
                                    .then(() => {
                                        return { result: true, message: 'Dados atualizados com sucesso!'}
                                    })
                                    .catch((error) => {
                                        return { result: false, message: error }
                                    });
        return response;
    }
}

export default ProfessionalModal;