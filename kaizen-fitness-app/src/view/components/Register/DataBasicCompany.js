import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';

import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import ChooseAvatar from '../ChooseAvatar';
import Buttons from './Buttons';
import ModalAvatarsForProfilePicture from '../ChooseAvatar/ModalAvatarsForProfilePicture';
import SnackBar from '../SnackBar';

export default function DataBasicCompany() {

  const onlyLetterRegex = new RegExp(/^[A-Za-zÀ-ú\s]+$/);

  const [errAvatar, setErrAvatar] = useState(false);
  const [errName, setErrName] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const {
    avatar, setAvatar,
    name, setName,
    stepNum, setStepNum
  } = useContext(DataContext);
  const { color } = useContext(ColorContext);

  const isNameValid = () => {
    const valid = onlyLetterRegex.test(name);
    setErrName(!valid)
  }

  const canIGoToTheNextStep = () => {
    if(avatar.length === 0) {
      setErrAvatar(true);
      return false;
    }
    else if(name.length === 0){
      setErrName(true);
      return false;
    }

    return true;
  }

  function validateData() {
    if(errAvatar || errName || !canIGoToTheNextStep()) {
      setVisibleSnackbar(true);
    }
    else setStepNum(stepNum + 1);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Básicos</Text>
      <Text style={styles.description}>Preencha os campos abaixo com as informações solicitadas:</Text>
      <ChooseAvatar chooseStatusModal={setIsModalActive} size={85} err={errAvatar}/>
      {
        errAvatar &&
          <HelperText type="error" visible={errAvatar} style={{ marginTop: 5}}>
            É obrigatório a escolha de um avatar
          </HelperText>
      }
      <View style={styles.boxInput}>
      <Text style={[styles.titleInput, { color: errName ? '#ba1a1a' : color }]}>Nome</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setName(text)}
          value={name}
          onBlur={() => isNameValid()}
        />
        {
          errName &&
            <HelperText type="error" visible={errName}>
              {name.length !== 0 ? 'O campo sobrenome só aceita letras' : 'Campo obrigatório'} 
            </HelperText>
        }
      </View>
      <Buttons validateData={() => validateData()}/>
      <ModalAvatarsForProfilePicture
        active={isModalActive}
        changeMyStatus={setIsModalActive}
        chooseAvatar={setAvatar}
        initialValue={avatar}
      />
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