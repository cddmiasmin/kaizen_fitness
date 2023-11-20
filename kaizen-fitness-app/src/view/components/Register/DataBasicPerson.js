import { useContext, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Button, Dialog, IconButton } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { DataContext } from '../../../contexts/DataContext';
import { ColorContext } from '../../../contexts/ColorContext';

import Buttons from './Buttons';
import ChooseAvatar from '../ChooseAvatar';
import ModalAvatarsForProfilePicture from '../ChooseAvatar/ModalAvatarsForProfilePicture';

import { mask, unMask } from 'remask';
import { mainColor } from '../../../colors/colors';

export default function DataBasicPerson() {

  const [isModalActive, setIsModalActive] = useState(false);
  const [isDateTimePickerActive, setDateTimePicker] = useState(false);
  
  const [isDialogActive, setIsDialogActive] = useState(false);

  const {
    avatar, setAvatar,
    name, setName,
    familyName, setFamilyName,
    dateOfBirth, setDateOfBirth,
    stepNum, setStepNum,
    document, setDocument,
    data, setData
  } = useContext(DataContext);
  const { color } = useContext(ColorContext);
  const { userType } = useContext(UserContext);

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

  function validateData() {
    let dataAux = data;

    dataAux.avatar = avatar;
    dataAux.name = name;
    dataAux.familyName = familyName;
    dataAux.dateOfBirth = new Date(dateOfBirth);
    dataAux.document = document;

    console.log('Aux', dataAux);

    setData(dataAux);
    setStepNum(stepNum + 1);
  }

  useEffect(() => setDateOfBirth(new Date(maximumDateOf18YearsAgo())), []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: color}]}>Dados Básicos</Text>
      <Text style={styles.description}>Preencha os campos abaixo com as informações solicitadas:</Text>
      <ChooseAvatar chooseStatusModal={setIsModalActive} size={85}/>
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
      <View style={styles.boxInput}>
        <Text style={[styles.titleInput, { color: color } ]}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          inputMode={'text'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setFamilyName(text)}
          value={familyName}
        />
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
            <Text style={[styles.titleInput, { color: color } ]}>CPF</Text>
            <View style={{
              justifyContent: 'space-around', flexDirection: 'row', backgroundColor: 'white'
            }}>
              <TextInput
                style={styles.inputDocument}
                inputMode={'numeric'}
                underlineColorAndroid="transparent"
                keyboardType={'number-pad'}
                onChangeText={(text) => setDocument(mask(unMask(text),'999.999.999-99'))}
                value={document}
                
              />
              <IconButton 
                icon="information"
                iconColor={'white'}
                style={{ backgroundColor: color }}
                size={18}
                onPress={() => setIsDialogActive(true)}
              /> 
            </View>
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