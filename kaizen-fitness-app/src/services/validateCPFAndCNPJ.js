export const validateEqualDigits = (typeDocument, document) => {
    const cpf = new RegExp(/(\d)\1{10}/);
    const cnpj = new RegExp(/(\d)\1{13}/);

    if(typeDocument === 'cpf') 
        return cpf.test(document);
    else 
       return cnpj.test(document);
}

export const validateDocumentFormat = (typeDocument, document) => {
    if(typeDocument === 'cpf') 
        return document.length < 11;
    else 
        return document.length < 14;
}