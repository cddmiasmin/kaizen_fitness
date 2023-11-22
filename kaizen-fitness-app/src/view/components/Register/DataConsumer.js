import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import Buttons from './Buttons';
import SnackBar from '../SnackBar';

import { mask, unMask } from 'remask';

export default function DataConsumer() {

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [errHeight, setErrHeight] = useState(false);
  const [errWeight, setErrWeight] = useState(false);

  const { color } = useContext(ColorContext);
  const {
    height, setHeight,
    weight, setWeight,
    stepNum,  setStepNum, 
    setHeightAux, setWeightAux
  } = useContext(DataContext);

  const isWeightValid = () => {
    if(weight.length <= 1) 
      setErrWeight(true);
    else 
      setErrWeight(false);
  }

  const isHeightValid = () => {
    if(height.length <= 1) 
      setErrHeight(true);
    else 
      setErrHeight(false);
  }

  const canIGoToTheNextStep = () => {
    if(height.length === 0) {
      setErrHeight(true);
      return false;
    }
    else if(weight.length === 0){
      setErrWeight(true);
      return false;
    }

    return true;
  }

  function validateData() {
    if(errHeight || errWeight || !canIGoToTheNextStep()) setVisibleSnackbar(true);
    else setStepNum(stepNum + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados para obter IMC e consumo de água</Text>
      <Text style={styles.description}>
        Conforme presente em nosso blah blah usamos os dados de altura e peso para fornecer 
        informações de IMC (Índice de massa corporal) e a quantidade ideal de consumo de água
      </Text>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: errHeight ? '#ba1a1a' : color }]}>Altura: </Text>
        <TextInput
          style={styles.input}
          inputMode={'decimal'}
          keyboardType={'decimal-pad'}
          underlineColorAndroid="transparent"
          onChangeText={(value) => {
            setHeight(mask(unMask(value), ['9,9','9,99']));
            setHeightAux(mask(unMask(value), ['9.9','9.99']));
          }}
          value={height}
          onBlur={() => isHeightValid()}
        />
        {
          errHeight &&
            <HelperText type="error" visible={errHeight}>
              {height.length === 0 ? 'Campo obrigatório' : 'Altura inválida'}
            </HelperText>
        }
      </View>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: errWeight ? '#ba1a1a' : color } ]}>Peso: </Text>
        <TextInput
          style={styles.input}
          inputMode={'decimal'}
          keyboardType={'decimal-pad'}
          underlineColorAndroid="transparent"
          onChangeText={(value) => {
            setWeight(mask(unMask(value), ['99,9', '999,9']));
            setWeightAux(mask(unMask(value), ['99.9', '999.9']));
          }}
          value={weight}
          onBlur={() => isWeightValid()}
        />
        {
          errWeight &&
            <HelperText type="error" visible={errWeight}>
              {weight.length === 0 ? 'Campo obrigatório' : 'Peso inválido'}
            </HelperText>
        }
      </View>
      <Buttons validateData={() => validateData()}/>
      <SnackBar 
        visible={visibleSnackbar} 
        setVisible={setVisibleSnackbar} 
        message={`Preencha os campos corretamente para ir para a próxima etapa!`} 
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
    height: 650
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