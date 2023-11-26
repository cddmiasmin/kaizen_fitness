import { useContext, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Button, Dialog, HelperText, IconButton } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import Buttons from './Buttons';
import SnackBar from '../SnackBar';
import ChooseAvatar from '../ChooseAvatar';
import ModalAvatarsForProfilePicture from '../ChooseAvatar/ModalAvatarsForProfilePicture';

import { mask, unMask } from 'remask';

import { mainColor } from '../../../colors/colors';
import { validateDocumentFormat, validateEqualDigits } from '../../../services/validateCPFAndCNPJ';

export default function DataBasicPerson() {

  const onlyLetterRegex = new RegExp(/^[A-Za-zÀ-ú\s]+$/);

  const [errAvatar, setErrAvatar] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errFamilyName, setErrFamilyName] = useState(false);
  const [errDocument, setErrDocument] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isDateTimePickerActive, setDateTimePicker] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [isDialogActive, setIsDialogActive] = useState(false);

  const {
    avatar, setAvatar,
    name, setName,
    familyName, setFamilyName,
    dateOfBirth, setDateOfBirth,
    stepNum, setStepNum,
    document, setDocument,
    documentAux, setDocumentAux,
  } = useContext(DataContext);
  const { color } = useContext(ColorContext);
  const { userType } = useContext(UserContext);

  const isDocumentValid = () => {
    const documentFormat = validateDocumentFormat('cpf', documentAux);
    const equalDigits = validateEqualDigits('cpf', documentAux);

    if(documentFormat || equalDigits) 
      setErrDocument(true);
    else setErrDocument(false);

  }

  const isFamilyNameValid = () => {
    const valid = onlyLetterRegex.test(familyName);
    setErrFamilyName(!valid)
  }

  const isNameValid = () => {
    const valid = onlyLetterRegex.test(name);
    setErrName(!valid)
  }

  const maximumDateOf18YearsAgo = () => {
    const today = new Date();
    return today.setFullYear(today.getFullYear() - 18);
  }

  const minimumDateOf120YearsAgo = () => {
    const today = new Date();
    return today.setFullYear(today.getFullYear() - 120);
  }

  const onChange = (event, datetime) => {
    setDateOfBirth(datetime);
    setDateTimePicker(false);
  };

  const canIGoToTheNextStep = () => {
    if(avatar.length === 0) {
      setErrAvatar(true);
      return false;
    }
    else if(documentAux.length === 0){
      setErrDocument(true);
      return false;
    }
    else if(name.length === 0){
      setErrName(true);
      return false;
    }
    else if(familyName.length === 0){
      setErrFamilyName(true);
      return false;
    }

    return true;
  }

  function validateData() {
    if(errAvatar || errFamilyName || errName || errDocument || !canIGoToTheNextStep()) {
      setVisibleSnackbar(true);
    }
    else setStepNum(stepNum + 1);
  }

  useEffect(() => setDateOfBirth(new Date(maximumDateOf18YearsAgo())), []);

  useEffect(() => {
    if(errAvatar) setErrAvatar(false);
  }, [avatar])

  return (
    <View style={[styles.container, { height: 650 }]}>
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
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: errFamilyName ? '#ba1a1a' : color } ]}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setFamilyName(text)}
          value={familyName}
          onBlur={() => isFamilyNameValid()}
        />
        {
          errFamilyName &&
            <HelperText type="error" visible={errFamilyName}>
              {familyName.length !== 0 ? 'O campo sobrenome só aceita letras' : 'Campo obrigatório'} 
            </HelperText>
        }
      </View>
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color }]}>Data de nascimento</Text>                               
        <TouchableOpacity
          style={styles.datetime} 
          onPress={() => {
              setDateTimePicker(true);
          }}
        >
          <Text>{dateOfBirth?.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
                                
        {isDateTimePickerActive  && (
          <DateTimePicker
            value={dateOfBirth}
            mode={'date'}
            display={'spinner'}
            is24Hour={true}
            onChange={onChange}
            maximumDate={new Date(maximumDateOf18YearsAgo())}
            minimumDate={new Date(minimumDateOf120YearsAgo())}
          />
        )}
      </View>

      {
        userType === 'consumer' &&
          <View style={styles.boxInput}>
            <Text style={[styles.titleInput, { color: errDocument ? '#ba1a1a' : color } ]}>CPF</Text>
            <View style={{
              justifyContent: 'space-around', flexDirection: 'row', backgroundColor: 'white'
            }}>
              <TextInput
                style={styles.inputDocument}
                inputMode={'numeric'}
                underlineColorAndroid="transparent"
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  setDocumentAux(mask(unMask(text),'99999999999'));
                  setDocument(mask(unMask(text),'999.999.999-99'));
                }}
                value={document}
                onBlur={() => isDocumentValid()}
              />
              <IconButton 
                icon="information"
                iconColor={'white'}
                style={{ backgroundColor: errDocument ? '#ba1a1a' : color }}
                size={18}
                onPress={() => setIsDialogActive(true)}
              /> 
            </View>
              {
                errDocument &&
                  <HelperText type="error" visible={errDocument}>
                    CPF inválido!
                  </HelperText>
              }
          </View>
      }
      <Buttons validateData={() => validateData()}/>
      <Dialog 
            visible={isDialogActive} 
            onDismiss={() => setIsDialogActive(false)}
            style={{ backgroundColor: mainColor }}
        >
            <Dialog.Icon icon="information" color={color}/>
            <Dialog.Title style={{ color: color, fontWeight: 'bold', textAlign: 'center'}}>CPF</Dialog.Title>
            <Dialog.Content>
                <Text style={{textAlign: 'center', color: 'white'}}>
                Estamos solicitando o seu CPF apenas para verificar que você é uma pessoa real.
                O seu dado será usado exclusivamente para este fim e não será compartilhado com terceiros.
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setIsDialogActive(false)} textColor={color}>Ok</Button>
            </Dialog.Actions>
      </Dialog>
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
  inputDocument: {
    width: '85%',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: 15
  },
  datetime: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    height: 45
  }
});