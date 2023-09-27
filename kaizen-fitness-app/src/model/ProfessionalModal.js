import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class ProfessionalModal {

    registerProfessional = async ( professional ) => {

        const idUser = await auth().currentUser.uid;
        const emailUser = await auth().currentUser.email;
        const emailVerified = await auth().currentUser.emailVerified;

        firestore()
            .collection("UserProfessional")
            .doc(idUser)
            .set({
                professional,
                email: emailUser,
                emailVerified: emailVerified
            })
            .then(() => {
                console.log('User added!');
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }

    getProfessional = async ( idUser ) => {

        const professional = await firestore().collection('UserProfessional').doc(idUser).get();

        return professional;
    }
}

export default ProfessionalModal;