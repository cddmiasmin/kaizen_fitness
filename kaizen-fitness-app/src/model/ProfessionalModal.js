import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class ProfessionalModal {

    registerProfessional = async ( professional ) => {

        const idUser = await auth().currentUser.uid;
        const emailUser = await auth().currentUser.email;
        const emailVerified = await auth().currentUser.emailVerified;

        professional.emailUser = emailUser;
        professional.emailVerified = emailVerified;

        firestore()
            .collection('UserProfessional')
            .doc(idUser)
            .set({
                professional
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

    deleteProfessional = async () => {
        const idUser = await auth().currentUser.uid;

        await auth().deleteUser(idUser);

        await firestore()
        .collection('UserProfessional')
        .doc(idUser)
        .delete()
        .then(() => {
          return 'Usuário deletado!'
        });
    }
}

export default ProfessionalModal;