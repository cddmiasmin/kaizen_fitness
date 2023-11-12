import { 
    professionalModelCreateProfile, 
    professionalModelReadProfile, 
    professionalModelUpdateProfile 
} from "../model/ProfessionalModel";

export const professionalControllerCreateProfile = async (professional) => {
    return await professionalModelCreateProfile(professional);
}

export const professionalControllerReadProfile = async () => {
    return await professionalModelReadProfile();
}

export const professionalControllerUpdateProfile = async (professional) => {
    return await professionalModelUpdateProfile(professional);
}

export const professionalControllerDeleteProfile = async () => {
    
}