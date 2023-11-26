const cnpjDigitValidation = (digitCheck, array, cnpj) => {
    const digitValue = array;
    let cnpjCharacterToInteger;
    let amount = 0;

    for(let digit = 0; digit < digitCheck; digit++){
        cnpjCharacterToInteger = parseInt(cnpj[digit]);
        amount += (cnpjCharacterToInteger * digitValue[digit]);
    }

    let checkDigit = null;
    const restOfDivision = amount % 11;

    if(restOfDivision < 2) checkDigit = 0;
    else checkDigit = (11 - restOfDivision);

    cnpjCharacterToInteger = parseInt(cnpj[digitCheck]);
    return checkDigit === cnpjCharacterToInteger;
}

export const validateCNPJNumber = (cnpj) => {
    let digitValue = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const firstDigitValidation = cnpjDigitValidation(12, digitValue, cnpj);

    digitValue.unshift(6);
    const secondDigitValidation = cnpjDigitValidation(13, digitValue, cnpj);

    return firstDigitValidation && secondDigitValidation 
}

const cpfDigitValidation = (valueCalc, digitCheck, cpf) => {
    let cpfCharacterToInteger = 0;
    let amount = 0;
    let digitValue = valueCalc;
  
    for(let digit = 0; digit < digitCheck; digit ++){
      cpfCharacterToInteger = parseInt(cpf[digit]);
      amount += (cpfCharacterToInteger * digitValue);
  
      digitValue--; 
    }
  
    const checkDigit = (amount * 10) % 11;
  
    cpfCharacterToInteger = parseInt(cpf[digitCheck]);
    return checkDigit === cpfCharacterToInteger;
}
  
export const validateCPFNumber = (cpf) => {
    const firstDigitValidation = cpfDigitValidation(10, 9, cpf);
    const secondDigitValidation = cpfDigitValidation(11, 10, cpf);

    return firstDigitValidation && secondDigitValidation;
}

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