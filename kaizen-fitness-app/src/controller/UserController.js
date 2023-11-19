import { 
    userModelAuth,
    userModelSignIn, 
    userModelSignUp,
    userModelSignOut, 
    userModelSignInGoogle, 
    userModelForgotPassword,
    userModelEmailValidation,
} from "../model/UserModel"
import { consumerControllerReadProfile } from "./ConsumerController";
import { professionalControllerReadProfile } from "./ProfessionalController";

export const userControllerAuth = async () => {
    return await userModelAuth();
}

export const userControllerHasAProfile = async () => {

    const consumer = await consumerControllerReadProfile();
    const professional = await professionalControllerReadProfile();

    // console.log('CONSUMER', consumer, consumer.data());
    // console.log('PROF', professional, professional.data());
    
    if(consumer !== undefined) 
        return { userType: "consumer", data: consumer };    
    
    if(professional !== undefined) 
        return { userType: "professional", data: professional };

    return { userType: "noProfile", data: [] };
}

export const userControllerSignIn = async (email, password) => {
    return await userModelSignIn(email, password);
}

export const userControllerSignUp = async (email, password) => {
    const signUp = await userModelSignUp(email, password);
    const emailValidation = await userControllerEmailValidation();
    return signUp;
}

export const userControllerSignOut = async () => {
    return await userModelSignOut();
}

export const userControllerSignInGoogle = async () => {
    return await userModelSignInGoogle(); 
}

export const userControllerForgotPassword = async () => {
    return await userModelForgotPassword();
}

export const userControllerAuthenticationDelete = async () => {
    //return await 
}

export const userControllerEmailValidation = async () => {
    return await userModelEmailValidation();
}