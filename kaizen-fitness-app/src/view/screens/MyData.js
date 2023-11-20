import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, IconButton, ActivityIndicator } from 'react-native-paper';
import { TextInput as NativeTextInput } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { AntDesign } from '@expo/vector-icons';

import Line from '../components/Line';

import { DataContext } from '../../contexts/DataContext';
import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import { consumerControllerUpdateProfile } from '../../controller/ConsumerController';
import { professionalControllerUpdateProfile } from '../../controller/ProfessionalController';

import DialogAlert from '../components/DialogAlert';
import SnackBar from '../components/SnackBar';
import ChooseAvatar from '../components/ChooseAvatar';
import ModalAvatarsForProfilePicture from '../components/ChooseAvatar/ModalAvatarsForProfilePicture';

export default function MyData() {

  const navigation = useNavigation();

  const [noChanges, setNoChanges] = useState(true);
  const [changesNames, setChangesNames] = useState([]);

  const [colorTextHeight, setColorTextHeight] = useState(color);
  const [colorTextWeight, setColorTextWeight] = useState(color);

  //DialogAlert
  const [visible, setVisible] = useState(false);
  const [whoCalledTheDialog, setWhoCalledTheDialog] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  //SnackBar
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [messageSnackBar, setMessageSnackbar] = useState('');
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  //Modal
  const [isModalActive, setIsModalActive] = useState(false);

  const { color } = useContext(ColorContext);
  const { user, setUser, userType, getProfile } = useContext(UserContext);
  const { 
    myData, dateOfBirth,
    avatar, setAvatar, 
    height, setHeight, 
    weight, setWeight, 
    data, setData, 
    heightAux, setHeightAux,
    weightAux, setWeightAux
  } = useContext(DataContext);
  
  const documentLabel = userType === 'consumer' || user.kindOfPerson === 'PF' 
                          ? 'CPF'
                          : 'CNPJ';

  const saveChangesForMyData = async () => {
    console.log(data);

    let response = {};

    if(userType === 'consumer') response = await consumerControllerUpdateProfile(data);
    else response = await professionalControllerUpdateProfile(data);

    console.log(response, response.length);

    if(Object.keys(response).length !== 0) {
      setErrorSnackBar(!response.result);
      setMessageSnackbar(response.message);
      setVisibleSnackbar(true);

      if(response.result){
        setUser([]);
        getProfile();
      }
    }
  }

  const executeDialogUserChoice = () => {
    if(whoCalledTheDialog === 'left') navigation.navigate('Profile');
    else saveChangesForMyData();
  }

  const buildContentDialog = (alert) => {

    const message = (
        <View>
            <Text style={{textAlign: 'center', color: 'white', marginBottom: 10}}>
                {alert}
            </Text>
            {
                changesNames.map((change, key) => (
                    <Text key={key} style={{textAlign: 'center', color: 'white', marginBottom: 2}}>{change}</Text>
                ))
            }
        </View>
    );

    setDialogContent(message);

  }

  const thereWasAChangeInConsumerData  = () => {
    return  avatar === user.avatar
      &&    height === user.height
      &&    weight === user.weight;
  }

  const thereWasAChangeInProfessionalData  = () => {
    return  avatar  === user.avatar;
  }

  const thereWasAChange = () => {
    if(userType === 'consumer') return thereWasAChangeInConsumerData();
    else return thereWasAChangeInProfessionalData();
  }

  const whatConsumerDataHasChanged = () => {
    let changesNames = [];
    let changesData = {};

    if(avatar !== user.avatar){
      changesNames.push("Avatar de perfil");
      changesData.avatar = avatar;
    }

    if(height !== user.height){
      changesNames.push("Altura");
      changesData.height = height;
    }

    if(weight !== user.weight){
      changesNames.push("Peso");
      changesData.weight = weight;
    }

    return { names: changesNames, data: changesData };
  }

  const whatProfessionalDataHasChanged = () => {
    let changesNames = [];
    let changesData = {};

    if(avatar !== user.avatar){
      changesNames.push("Avatar de perfil");
      changesData.avatar = avatar;
    }

    return { names: changesNames, data: changesData };
  }

  const whatDataHasChanged = () => {
    let changes = {};

    if(userType === 'consumer') changes = whatConsumerDataHasChanged();
    else changes = whatProfessionalDataHasChanged();

    setChangesNames(changes.names)
    setData(changes.data);
  }

  useEffect(() => myData(), []);

  useEffect(() => {
    if(user.length !== 0) myData();
  }, [user]);

  useEffect(() => {
    setColorTextHeight(color);
    setColorTextWeight(color);
  }, []);

  useEffect(() => {
    const change = thereWasAChange();
    setNoChanges(change);
  }, [avatar, height, weight]);

  useEffect(() => {

    if(Object.keys(data).length !== 0 && changesNames.length !== 0){

      if(whoCalledTheDialog === 'left') {
          buildContentDialog('Deseja descartar as alterações de: ');
          setDialogTitle('Voltar ao perfil');
          setVisible(true);
      }
      
      if(whoCalledTheDialog === 'check-bold') {
          buildContentDialog('Deseja salvar as alterações de: ');
          setDialogTitle('Salvar alterações');
          setVisible(true);
      }

    }

  }, [data, changesNames]);

  if(user.length === 0)
    return (
        <View style={styles.loading}> 
            <StatusBar style='light'/>
            <ActivityIndicator animating={true} color={color} />
        </View>
    )
 
  return (
    <ScrollView style={styles.container}>
        <StatusBar style='light'/>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => {
                if(!noChanges){
                  setWhoCalledTheDialog('left');
                  whatDataHasChanged();
                }
                else navigation.navigate('Profile');
              }}
            >
                <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.screen}>Meus Dados</Text>
          </View>
          <View style={styles.headerRight}>
            <IconButton
                icon="check-bold"
                iconColor={color}
                style={styles.button}
                containerColor={mainColor}
                size={18}
                disabled={noChanges}
                onPress={() => {
                  setWhoCalledTheDialog('check-bold');
                  whatDataHasChanged();
                }}
            />
          </View>
        </View>
        <ChooseAvatar chooseStatusModal={setIsModalActive} size={90}/>
        <Line width={'100%'} height={'0.3%'} top={'7%'} bottom={'5%'}/>
        <Text 
          style={[styles.message, {color: color}]}
        >
          Os dados de nome, sobrenome, data de nascimento e {documentLabel} são inalteráveis. Para saber mais, consulte a nossa {'política de privacidade'}.
        </Text>
        <KeyboardAvoidingView style={styles.information}>
          <TextInput
            mode='outlined'
            label="Nome"
            value={user.name}
            outlineColor={'white'}
            textColor={color}
            style={{ backgroundColor: mainColor }}
            theme={{
              colors: {
                  onSurfaceVariant: 'white'
              }
            }}
            editable={false}
          />

          {
            (userType === 'consumer' || user.kindOfPerson === 'PF') &&
            <TextInput
              mode='outlined'
              label="Sobrenome"
              value={user.familyName}
              outlineColor={'white'}
              textColor={color}
              style={{ backgroundColor: mainColor }}
              theme={{
                colors: {
                    onSurfaceVariant: 'white'
                }
              }}
              editable={false}
            />
          }

          {
            (userType === 'consumer' || user.kindOfPerson === 'PF') &&
              <TextInput
              mode='outlined'
              label='Data de nascimento'
              value={dateOfBirth}
              outlineColor={'white'}
              textColor={color}
              style={{ backgroundColor: mainColor }}
              theme={{
                colors: {
                    onSurfaceVariant: 'white'
                }
              }}
              editable={false}
            />
          }

          <TextInput
            mode='outlined'
            label={documentLabel}
            value={user.document}
            outlineColor={'white'}
            textColor={color}
            style={{ backgroundColor: mainColor }}
            theme={{
              colors: {
                  onSurfaceVariant: 'white'
              }
            }}
            editable={false}
          />

           {
              userType === 'consumer' &&
              <>
                  <TextInput
                    mode='outlined'
                    label='Altura'
                    value={height}
                    onChangeText={(value) => {
                      setHeight(mask(unMask(value), '9,99'));
                      setHeightAux(mask(unMask(value), '9.99'));
                    }}
                    outlineColor={'white'}
                    activeOutlineColor={color}
                    textColor={colorTextHeight}
                    style={{ backgroundColor: mainColor }}
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    editable={true}
                    onFocus={() => setColorTextHeight('white')}
                    onBlur={() => setColorTextHeight(color)}
                    right={<TextInput.Icon icon="pencil-outline" color={colorTextHeight}/>}
                    render={(props) => <NativeTextInput keyboardType={'decimal-pad'} {...props} />}
                  />

                  <TextInput
                    mode='outlined'
                    label='Peso'
                    value={weight}
                    onChangeText={(value) => {
                      setWeight(mask(unMask(value), ['9,9', '99,9', '999,9']));
                      setWeightAux(mask(unMask(value), ['9.9', '99.9', '999.9']));
                    }}
                    outlineColor={'white'}
                    activeOutlineColor={color}
                    textColor={colorTextWeight}
                    style={{ backgroundColor: mainColor }}
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    editable={true}
                    onFocus={() => setColorTextWeight('white')}
                    onBlur={() => setColorTextWeight(color)}
                    right={<TextInput.Icon icon="pencil-outline" color={colorTextWeight}/>}
                    render={(props) => <NativeTextInput keyboardType={'decimal-pad'} {...props} />}
                  />
              </>
           }
        </KeyboardAvoidingView>
        <DialogAlert
          visible={visible} 
          setVisible={setVisible} 
          title={dialogTitle} 
          message={dialogContent} 
          response={() => executeDialogUserChoice()}
        />
        <SnackBar 
          visible={visibleSnackbar} 
          setVisible={setVisibleSnackbar} 
          message={messageSnackBar} 
          error={errorSnackBar}
          width={315} 
        />
        <ModalAvatarsForProfilePicture
          active={isModalActive}
          changeMyStatus={setIsModalActive}
          chooseAvatar={setAvatar}
          initialValue={avatar}
       /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    flex: 1,
    backgroundColor: mainColor,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  header: {
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexDirection: 'row',
    width: '100%',
  },
  headerLeft:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRight:{
    alignItems: 'flex-end',
    alignItems: 'center',
  },
  screen: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 45
  },
  information: {
    width: '100%',
    marginBottom: 25,
    gap: 25
  },
  icon: {
    position: 'absolute', 
    top: '65%', 
    left: '22%', 
    zIndex: 2
  },
  avatar: {
    zIndex: 1
  },
  message: {
    width:'100%',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: '5%'
  },
});