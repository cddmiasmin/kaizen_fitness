import { userModelSignIn, userModelSignOut, userModelSignUp } from "../model/UserModel"
import { consumerControllerReadProfile } from "./ConsumerController";
import { professionalControllerReadProfile } from "./ProfessionalController";

export const userControllerHasAProfile = async () => {

    const consumer = await consumerControllerReadProfile();
    const professional = await professionalControllerReadProfile();

    console.log('CONSUMER', consumer, consumer.data());
    console.log('PROF', professional, professional.data());
    
    if(consumer.data() !== undefined) 
        return { userType: "consumer", data: consumer.data() };    
    
    if(professional.data() !== undefined) 
        return { userType: "professional", data: professional.data() };

    return { userType: "noProfile", data: [] };
}

export const userControllerSignIn = async (email, password) => {
    return await userModelSignIn(email, password);
}

export const userControllerSignUp = async (email, password) => {
    return await userModelSignUp(email, password);
}

export const userControllerSignOut = async () => {
    //return await 
}

export const userControllerSignInGoogle = async () => {
    //return await 
}

export const userControllerForgotPassword = async () => {
    //return await 
}