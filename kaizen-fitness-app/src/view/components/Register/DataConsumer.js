import { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { ColorContext } from '../../../contexts/ColorContext';
import { DataContext } from '../../../contexts/DataContext';
import Buttons from './Buttons';

export default function DataConsumer() {

  const { color } = useContext(ColorContext);
  const {
    height, setHeight,
    weight, setWeight,
    data, setData, 
    stepNum,  setStepNum, 
  } = useContext(DataContext);

  function validateData() {
    let dataAux = data;

    dataAux.height = height;
    dataAux.weight = weight;

    console.log('Aux', dataAux);

    setData(dataAux);
    setStepNum(stepNum + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados para obter IMC e consumo de água</Text>
      <Text style={styles.description}>Conforme presente em nosso blah blah usamos os dados de altura e peso para fornecer informações de IMC (Índice de massa corporal) e a quantidade ideal de consumo de água</Text>
      
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color }]}>Altura: </Text>
        <TextInput
          style={styles.input}
          inputMode={'decimal'}
          keyboardType={'decimal-pad'}
          underlineColorAndroid="transparent"
          onChangeText={(value) => setHeight(value)}
          value={height}
        />
      </View>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color } ]}>Peso: </Text>
        <TextInput
          style={styles.input}
          inputMode={'decimal'}
          keyboardType={'decimal-pad'}
          underlineColorAndroid="transparent"
          onChangeText={(value) => setWeight(value)}
          value={weight}
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
    marginBottom: 10,
    textAlign: 'center'
  },
  titleInput:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  boxInput: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
});