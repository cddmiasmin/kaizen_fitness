import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { ColorContext } from '../../../contexts/ColorContext';
import { DataContext } from '../../../contexts/DataContext';

import Buttons from './Buttons';

import { mask, unMask } from 'remask';
import { consumerControllerIMC, consumerControllerWater } from '../../../controller/ConsumerController';

export default function DataConsumer() {

  const { color } = useContext(ColorContext);
  const {
    height, setHeight,
    weight, setWeight,
    data, setData, 
    stepNum,  setStepNum, 
    heightAux, setHeightAux,
    weightAux, setWeightAux
  } = useContext(DataContext);

  function validateData() {
    let dataAux = data;
    const imc = consumerControllerIMC(heightAux, weightAux);
    const water = consumerControllerWater(weightAux);

    console.log(imc, water);

    dataAux.imc = imc;
    dataAux.dailyWaterConsumption = water;
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
          onChangeText={(value) => {
            setHeight(mask(unMask(value), '9,99'));
            setHeightAux(mask(unMask(value), '9.99'));
          }}
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
          onChangeText={(value) => {
            setWeight(mask(unMask(value), ['9,9', '99,9', '999,9']));
            setWeightAux(mask(unMask(value), ['9.9', '99.9', '999.9']));
          }}
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
});