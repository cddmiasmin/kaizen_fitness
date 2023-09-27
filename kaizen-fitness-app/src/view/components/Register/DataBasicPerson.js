import { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import { mask, unMask } from 'remask';

import Buttons from './Buttons';

export default function DataBasicPerson() {
 
  const {
    photo, setPhoto,
    name, setName,
    familyName, setFamilyName,
    dataOfBirth, setDataOfBirth,
    stepNum, setStepNum,
  } = useContext(DataContext);

  const { color } = useContext(ColorContext);

  function validateData() {
    setStepNum(stepNum + 1)
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Básicos</Text>
      <Text style={styles.description}>Preencha os campos abaixo para continuar com o processo de cadastro</Text>
      
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color}]}>Nome</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color } ]}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setFamilyName(text)}
          value={familyName}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color}]}>Data de nascimento</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setDataOfBirth(mask(unMask(text), ['99/99/9999']))}
          value={dataOfBirth}
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
    marginBottom: 10,
    textAlign: 'center'
  },
  titleInput:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
  boxInput: {
    width: '100%',
    marginTop: 20,
  }
});