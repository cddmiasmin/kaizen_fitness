import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const userModelAuth = async () => {
    const response = auth().currentUser;
    return response;
}

export const userModelSignIn = async (email, password) => {

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

export const userModelSignUp = async (email, password) => {

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

export const userModelSignOut = async () => {

    const response = await auth()
                            .signOut()
                            .then(() => {
                                return { result: true, message: 'Saída executada com sucesso. Até logo!'}
                            })
                            .catch(error => {
                                return { result: false, message: error.code + ': ' + error }
                            });

    return response;
}

export const userModelSignInGoogle = async () => {

    GoogleSignin.configure({
        webClientId: '118581849503-fu90sd5l1hd5as2vekqve80elqmdbuj0.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    const { idToken } = await GoogleSignin.signIn();
  
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    const userSingIn = auth().signInWithCredential(googleCredential);

    userSingIn.then((user) => {
        console.log(user);
        return { result: true, message: 'Conexão com o Google bem-sucedida. Bem-vindo!'}
    })
    .catch((error) => {
        return { result: false, message: error.code + ': ' + error}
    });

}

export const userModelForgotPassword = async () => {

    const response = await auth()
                            .sendPasswordResetEmail(email)
                            .then(() => {
                                return { result: true, message: 'E-mail de recuperação enviado!'}
                            })
                            .catch( error => {
                                if (error.code === 'auth/invalid-email') 
                                    return { result: false, message: 'Esse endereço de e-mail é inválido!'}
                                

                                return { result: false, message: error.code + ': ' + error }
                            });

    return response;
}

export const userModelAuthenticationDelete = async () => {
    //return await 
}

export const userModelEmailValidation = async () => {

    const user = auth().currentUser;
    
    const response = user.sendEmailVerification()
                        .then((user) => {
                            console.log(user);
                            return {
                                result: true,
                                message: `Validação enviada para o seu e-mail`
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            return {
                                result: false,
                                message: error.code + ': ' + error
                            }
                        }); 
    
    return response;

}