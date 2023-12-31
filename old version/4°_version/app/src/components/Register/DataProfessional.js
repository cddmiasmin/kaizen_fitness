import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { mask, unMask } from 'remask';

import { ColorContext } from '../../contexts/ColorContext';
import { RegisterContext } from '../../contexts/RegisterContext';

import Buttons from './Buttons';

export default function DataProfessional() {
  
  const { 
    kindOfPerson, setKindOfPerson,
    document, setDocument,
    stepNum, setStepNum,
  } = useContext(RegisterContext);

  const { color } = useContext(ColorContext);

  function validateData() {
    setStepNum(stepNum + 1)
  }
  
 return (
  <View title="Accordions" style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Profissionais</Text>
      <Text style={styles.description}>Florence melhor do mundo</Text>

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
          underlineColorAndroid="transparent"
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
      marginTop: 30,
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
