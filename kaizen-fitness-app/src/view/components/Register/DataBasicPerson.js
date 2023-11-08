import { useContext, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import Buttons from './Buttons';

export default function DataBasicPerson() {

  const [isDateTimePickerActive, setDateTimePicker] = useState(false);

  const {
    photo, setPhoto,
    name, setName,
    familyName, setFamilyName,
    dataOfBirth, setDataOfBirth,
    stepNum, setStepNum,
  } = useContext(DataContext);

  const { color } = useContext(ColorContext);

  const maximumDateOf18YearsAgo = () => {
    const today = new Date();
    return today.setFullYear(today.getFullYear() - 18);
  }

  const minimumDateOf120YearsAgo = () => {
    const today = new Date();
    return today.setFullYear(today.getFullYear() - 120);
  }

  const onChange = (event, datetime) => {
    setDataOfBirth(datetime);
    setDateTimePicker(false);
  };

  function validateData() {
    setStepNum(stepNum + 1);
  }

  useEffect(() => setDataOfBirth( new Date(maximumDateOf18YearsAgo())), []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Básicos</Text>
      <Text style={styles.description}>Preencha os campos abaixo com as informações solicitadas:</Text>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color }]}>Nome</Text>
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
        <Text style={[styles.titleInput, { color: color }]}>Data de nascimento</Text>                               
        <TouchableOpacity
          style={styles.datatime} 
          onPress={() => {
              setDateTimePicker(true);
          }}
        >
          <Text>{dataOfBirth.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
                                
        {isDateTimePickerActive  && (
          <DateTimePicker
            value={dataOfBirth}
            mode={'date'}
            display={'spinner'}
            is24Hour={true}
            onChange={onChange}
            maximumDate={new Date(maximumDateOf18YearsAgo())}
            minimumDate={new Date(minimumDateOf120YearsAgo())}
          />
        )}

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
  datatime: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: 45
  }
});