export const createJsonObject = ( string ) => {

    const jsonObject = string;
    const jsonString = JSON.stringify(jsonObject);
    const object = JSON.parse(jsonString);

    return object;

}