import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ProfessionalController from '../controller/ProfessionalController';

class UserModal {

    professionalController = new ProfessionalController();

    hasFullResgistration = async () => {

        const idUser = auth().currentUser.uid;

        const professional = await this.professionalController.getProfessional(idUser);
        const consumer = await firestore().collection('UserConsumer').doc(idUser).get();

        if(professional.data() !== undefined) 
            return {"userType": "professional", "data": professional.data()};

        if(consumer.data() !== undefined) 
            return {"userType": "consumer", "data": consumer.data()};

        return false;
    
    }

    signIn = async (email, password) => {
        const response = await auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(() => {
                                    return { result: true, message: 'Login bem-sucedido. Bem-vindo de volta!'}
                                })
                                .catch(error => {
                                    if (error.code === 'auth/invalid-login')
                                        return { result: false, message: 'Endereço de e-mail ou senha incorretos'} 
                                    else
                                        return { result: false, message: error.code + ': ' + error}
                                });
        return response;
    }

    signUp = async (email, password) => {
        const response = await auth()
                                .createUserWithEmailAndPassword(email, password)
                                .then(() => {
                                    return { result: true, message: 'Cadastro concluído com sucesso. Obrigado por se juntar a nós!'}
                                })
                                .catch(error => {
                                    if (error.code === 'auth/email-already-in-use') {
                                        return { result: false, message: 'Esse endereço de email já esta em uso!'}
                                    }

                                    if (error.code === 'auth/invalid-email') {
                                        return { result: false, message: 'Esse endereço de e-mail é inválido!'}
                                    }

                                    return { result: false, message: error.code + ': ' + error }
                                });
        return response;
    }

    signOut = async () => {
        const response = await auth()
                                .signOut()
                                .then(() => {
                                    return { result: true, message: 'Cadastro concluído com sucesso. Obrigado por se juntar a nós!'}
                                })
                                .catch(error => {
                                    return { result: false, message: error.code + ': ' + error }
                                })
        return response;
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