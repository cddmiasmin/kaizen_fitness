import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ProfessionalController from '../controller/ProfessionalController';

class UserModal {

    professionalController = new ProfessionalController();

    hasFullResgistration = async () => {

        const idUser = await auth().currentUser.uid;

        const professional = await this.professionalController.getProfessional(idUser);
        const consumer = await firestore().collection('UserConsumer').doc(idUser).get();

        if(professional.data() !== undefined) 
            return professional.data();

        if(consumer.data() !== undefined) 
            return consumer.data();

        return false;
    
    }

    signIn = (email, password) => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          console.log('User account created & signed in!', success);
        })
        .catch(error => {

          if (error.code === 'auth/invalid-login') console.log('Endereço de e-mail ou senha incorretos');
          else console.log(error.code, error)
  
        });
    }

    signUp = (email, password) => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

    signOut = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    signInGoogle = async () => {

        GoogleSignin.configure({
            webClientId: '118581849503-fu90sd5l1hd5as2vekqve80elqmdbuj0.apps.googleusercontent.com',
        });
    
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        const { idToken } = await GoogleSignin.signIn();
      
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        const userSingIn = auth().signInWithCredential(googleCredential);
    
        userSingIn.then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error)
        });
    }
}

export default UserModal;