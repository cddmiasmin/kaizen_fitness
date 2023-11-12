import { 
    consumerModelCreateProfile, 
    consumerModelReadProfile, 
    consumerModelUpdateProfile 
} from "../model/ConsumerModel"

export const consumerControllerCreateProfile = async (consumer) => {
    return await consumerModelCreateProfile(consumer);
}

export const consumerControllerReadProfile = async () => {
    return await consumerModelReadProfile();
}

export const consumerControllerUpdateProfile = async (consumer) => {
    return await consumerModelUpdateProfile(consumer);
}

export const consumerControllerDeleteProfile = async () => {
    
}

export const consumerControllerIMC = (height, weight) => {
    let result = {};
    const heightFloat = parseFloat(height);
    const weightFloat = parseFloat(weight);

    const value = weightFloat/(heightFloat * heightFloat);
    result.value = value.toFixed(2);

    if (value < 18.5)    result.classification = "Abaixo do normal";
    else if (value < 25) result.classification = "Normal";
    else if (value < 30) result.classification = "Sobrepeso";
    else if (value < 35) result.classification = "Obesidade grau I";
    else if (value < 40) result.classification = "Obesidade grau II";
    else                 result.classification = "Obesidade grau III";
    
    return result;
}

export const consumerControllerWater = (weight) => {
    const weightFloat = parseFloat(weight);
    const quantityWater = 35 * weightFloat;
    const liters = quantityWater / 1000;

    return liters.toFixed(1);
}
