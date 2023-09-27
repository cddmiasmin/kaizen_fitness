import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class ProfessionalModal {

    registerProfessional = async ( professional ) => {

        const idUser = await auth().currentUser.uid;
        console.log("id", idUser)

        firestore()
            .collection("UserProfessional")
            .doc(idUser)
            .set(professional)
            .then((success) => {
                console.log('User added!', success);
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