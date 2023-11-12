import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const professionalAuth = auth().currentUser;

export const professionalModelCreateProfile = async (professional) => {

    const idUser = professionalAuth.uid;
    const emailUser = professionalAuth.email;

    professional.emailUser = emailUser;

    const response = await firestore()
                            .collection('ProfessionalUsers')
                            .doc(idUser)
                            .set(professional)
                            .then(() => {
                                return { result: true, message: 'Perfil profissional criado com sucesso!'}
                            })
                            .catch((error) => {
                                return { result: false, message: error }
                            });

    return response;
    
}

export const professionalModelReadProfile = async () => {

    const idUser = professionalAuth.uid;
    const response = await firestore()
                            .collection('ProfessionalUsers')
                            .doc(idUser)
                            .get();
    return response;
}

export const professionalModelUpdateProfile = async (professional) => {
    const idUser = professionalAuth.uid;

    const response = await firestore()
                            .collection('ProfessionalUsers')
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

export const professionalModelDeleteProfile = async () => {
    
}