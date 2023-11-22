import { 
    consumerModelCreateProfile, 
    consumerModelReadProfile, 
    consumerModelUpdateProfile 
} from "../model/ConsumerModel";

import { mask, unMask } from 'remask';

const timestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    date.setMilliseconds(timestamp.nanoseconds / 1000000);
    return new Date(date);
}

export const consumerControllerCreateProfile = async (consumer) => {
    return await consumerModelCreateProfile(consumer);
}

export const consumerControllerReadProfile = async () => {
    const response = await consumerModelReadProfile();
    let consumer = response.data();

    if(consumer !== undefined){
        const datetime = timestampToDate(consumer.dateOfBirth);
        consumer.dateOfBirth = datetime;
    }

    return consumer;
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
    result.value = mask(unMask(value.toFixed(2)), ['9,9', '99,9']);

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

    return mask(unMask(liters.toFixed(1)), ['9,9']);
}
