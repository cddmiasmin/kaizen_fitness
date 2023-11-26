import { 
    professionalModelCreateProfile, 
    professionalModelReadProfile, 
    professionalModelUpdateProfile 
} from "../model/ProfessionalModel";

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    date.setMilliseconds(timestamp.nanoseconds / 1000000);
    return new Date(date);
}

export const professionalControllerCreateProfile = async (professional) => {
    return await professionalModelCreateProfile(professional);
}

export const professionalControllerReadProfile = async () => {

    const response = await professionalModelReadProfile();
    let professional = response.data();

    if(professional !== undefined){
        const datetime = timestampToDate(professional.dateOfBirth);
        professional.dateOfBirth = datetime;
    }

    return professional;
}

export const professionalControllerUpdateProfile = async (professional) => {
    return await professionalModelUpdateProfile(professional);
}

export const professionalControllerDeleteProfile = async () => {
    
}

export const professionalControllerDeleteAccount = async () => {
    
}