import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import ChooseAvatar from '../ChooseAvatar';
import Buttons from './Buttons';
import ModalAvatarsForProfilePicture from '../ChooseAvatar/ModalAvatarsForProfilePicture';

export default function DataBasicCompany() {

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    avatar, setAvatar,
    name, setName,
    data, setData,
    stepNum, setStepNum
  } = useContext(DataContext);
  const { color } = useContext(ColorContext);

  function validateData() {
    let dataAux = data;

    dataAux.avatar = avatar;
    dataAux.name = name;

    console.log('Aux', dataAux);

    setData(dataAux);
    setStepNum(stepNum + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Básicos</Text>
      <Text style={styles.description}>Preencha os campos abaixo com as informações solicitadas:</Text>
      <ChooseAvatar chooseStatusModal={setIsModalActive}/>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color }]}>Nome</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <Buttons validateData={() => validateData()}/>
      <ModalAvatarsForProfilePicture
        active={isModalActive}
        changeMyStatus={setIsModalActive}
        chooseAvatar={setAvatar}
        initialValue={avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
    height: 600
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
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