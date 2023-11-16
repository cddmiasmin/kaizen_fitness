import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { mask, unMask } from 'remask';

import { ColorContext } from '../../../contexts/ColorContext';
import { DataContext } from '../../../contexts/DataContext';

import Buttons from './Buttons';

export default function DataProfessional() {
  
  const { 
    kindOfPerson, setKindOfPerson,
    document, setDocument,
    stepNum, setStepNum,
    data, setData
  } = useContext(DataContext);

  const { color } = useContext(ColorContext);

  function validateData() {
      let dataAux = data;
      dataAux.kindOfPerson = kindOfPerson;
      dataAux.document = document;

      console.log('Aux', dataAux);

      setData(dataAux);
      setStepNum(stepNum + 1);
  }
  
 return (
  <View title="Accordions" style={styles.container}>
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
        <Text style={[styles.titleInput, { color: color}]}>{kindOfPerson === 'PF' ? 'CPF:' : 'CNPJ:'}</Text>
        <TextInput
          style={styles.input}
          inputMode={'numeric'}
          underlineColorAndroid="transparent"
          keyboardType={'number-pad'}
          onChangeText={(text) => setDocument(mask(unMask(text), kindOfPerson === 'PF' ? '999.999.999-99' : '99.999.999/9999-99'))}
          value={document}
        />
      </View>
      <Buttons validateData={() => validateData()}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: 15,
      alignItems: 'center',
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
