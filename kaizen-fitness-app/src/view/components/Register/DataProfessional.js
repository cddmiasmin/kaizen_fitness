import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { HelperText } from 'react-native-paper';

import { mask, unMask } from 'remask';

import { ColorContext } from '../../../contexts/ColorContext';
import { DataContext } from '../../../contexts/DataContext';

import Buttons from './Buttons';
import SnackBar from '../SnackBar';

import { 
  validateCPFNumber,
  validateDocumentFormat, validateEqualDigits 
} from '../../../services/validateCPFAndCNPJ';

export default function DataProfessional() {

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [errDocument, setErrDocument] = useState(false);

  const { 
    kindOfPerson, setKindOfPerson,
    document, setDocument,
    documentAux, setDocumentAux,
    stepNum, setStepNum
  } = useContext(DataContext);

  const { color } = useContext(ColorContext);

  const isDocumentValid = () => {
    const typeDocument = kindOfPerson === 'PF' ? 'cpf' : 'cnpj';

    const documentFormat = validateDocumentFormat(typeDocument, documentAux);
    const equalDigits = validateEqualDigits(typeDocument, documentAux);

    if(documentFormat || equalDigits) setErrDocument(true);
    else {

      const validate = kindOfPerson === 'PF' ? validateCPFNumber(documentAux) : cnpjDigitValidation(documentAux);

      if(validate) setErrDocument(true);
      else setErrDocument(false);

    }

  }

  function validateData() {
    if(documentAux.length === 0) setErrDocument(true);

    if(errDocument || documentAux.length === 0) {
      setVisibleSnackbar(true);
    } else setStepNum(stepNum + 1);
  }
  
 return (
    <View style={[styles.container, { height: 650 }]}>
      <Text style={[styles.title, { color: color}]}>Dados Profissionais</Text>
      <Text style={styles.description}>Forneça seus dados profissionais, incluindo se você é uma Pessoa Física (CPF) ou Pessoa Jurídica (CNPJ).</Text>
      <View style={styles.typePerson}>
        <Text style={[styles.titleInput, { color: color }]}>Pessoa:</Text>
        <Picker
          selectedValue={kindOfPerson}
          onChange={(value) => setKindOfPerson(value)}
          onValueChange={(value) => {
            setKindOfPerson(value);
            setDocument('');
            setErrDocument(false);
          }}
          mode='dropdown'
          dropdownIconColor={color}
          dropdownIconRippleColor={color}
          style={[styles.picker]}
        >
          <Picker.Item label="Pessoa Física" value="PF" />
          <Picker.Item label="Pessoa Jurídica" value="PJ" />
        </Picker>
      </View>

      <View style={styles.document}>
        <Text style={[styles.titleInput, { color: errDocument ? '#ba1a1a' : color }]}>
          {kindOfPerson === 'PF' ? 'CPF:' : 'CNPJ:'}
        </Text>
        <TextInput
          style={styles.input}
          inputMode={'numeric'}
          underlineColorAndroid="transparent"
          keyboardType={'number-pad'}
          onChangeText={(text) => {
            setDocumentAux(mask(unMask(text), kindOfPerson === 'PF' ? '99999999999' : '99999999999999'));
            setDocument(mask(unMask(text), kindOfPerson === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'));
          }}
          value={document}
          onBlur={() => isDocumentValid()}
        />
        {
          errDocument &&
            <HelperText type="error" visible={errDocument}>
              {kindOfPerson === 'PF' ? 'CPF' : 'CNPJ'} inválido!
            </HelperText>
        }
      </View>
      <Buttons validateData={() => validateData()}/>
      <SnackBar 
        visible={visibleSnackbar} 
        setVisible={setVisibleSnackbar} 
        message={`Insira um ${kindOfPerson === 'PF' ? 'CPF' : 'CNPJ'} válido para ir para a próxima etapa!`} 
        error={true}
        width={315} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center'
  },
  titleInput:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  typePerson: {
    //backgroundColor: 'yellow',
    width: '100%',
  },
  picker: {
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  document: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
  service: {
    width: '100%',
    marginTop: 20,
  },
  containerChipServices: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chipService: {
    width: 'auto'
  }
});
